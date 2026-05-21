import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function refreshGoogleToken(photographer) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: photographer.google_refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || data.error);
  return data.access_token;
}

export async function POST() {
  try {
    const { data: shoots, error: shootsError } = await supabaseAdmin
      .from("photo_properties")
      .select("*")
      .eq("status", "needs_confirmation")
      .neq("google_event_id", "");

    if (shootsError) throw shootsError;

    const { data: photographers, error: photographersError } =
      await supabaseAdmin.from("photographers").select("*");

    if (photographersError) throw photographersError;

    const updated = [];
    const checked = [];

    for (const shoot of shoots || []) {
      const photographer = photographers.find(
        (p) =>
          p.name?.toLowerCase() === shoot.photographer?.toLowerCase() ||
          p.email?.toLowerCase() === shoot.photographer?.toLowerCase()
      );

      if (!photographer || !photographer.google_refresh_token) continue;

      const accessToken = await refreshGoogleToken(photographer);
      const calendarId = photographer.google_calendar_id || "primary";

      const eventResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events/${encodeURIComponent(shoot.google_event_id)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const event = await eventResponse.json();
      if (!eventResponse.ok) {
        checked.push({ id: shoot.id, error: event });
        continue;
      }

      const attendees = event.attendees || [];
      const matchingAttendee = attendees.find(
        (attendee) =>
          attendee.email?.toLowerCase() === photographer.email?.toLowerCase()
      );

      const accepted =
        matchingAttendee?.responseStatus === "accepted" ||
        attendees.some(
          (attendee) =>
            attendee.email?.toLowerCase() === photographer.email?.toLowerCase() &&
            attendee.responseStatus === "accepted"
        );

      checked.push({
        id: shoot.id,
        photographer: photographer.email,
        responseStatus: matchingAttendee?.responseStatus || "not_found",
      });

      if (!accepted) continue;

      const { data: updatedShoot, error: updateError } = await supabaseAdmin
        .from("photo_properties")
        .update({
          status: "scheduled",
          shoot_date: event.start?.dateTime || shoot.shoot_date,
          google_event_link: event.htmlLink || shoot.google_event_link,
        })
        .eq("id", shoot.id)
        .select()
        .single();

      if (!updateError && updatedShoot) updated.push(updatedShoot);
    }

    return NextResponse.json({ success: true, updated, checked });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sync Google confirmations", details: error.message },
      { status: 500 }
    );
  }
}
