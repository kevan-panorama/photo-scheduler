import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function refreshGoogleToken(photographer) {
  const expiry = photographer.google_token_expires_at
    ? new Date(photographer.google_token_expires_at).getTime()
    : 0;

  if (photographer.google_access_token && expiry > Date.now() + 60000) {
    return photographer.google_access_token;
  }

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

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  await supabase
    .from("photographers")
    .update({
      google_access_token: data.access_token,
      google_token_expires_at: new Date(
        Date.now() + data.expires_in * 1000
      ).toISOString(),
    })
    .eq("id", photographer.id);

  return data.access_token;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      shootId,
      photographerId,
      start,
      end,
      propertyTitle,
      ref,
      address,
      googlePin,
      services = [],
      notes = "",
      agent = "",
    } = body;

    if (!shootId || !photographerId || !start || !end) {
      return NextResponse.json(
        { error: "Missing shootId, photographerId, start, or end" },
        { status: 400 }
      );
    }

    const { data: photographer, error: photographerError } = await supabase
      .from("photographers")
      .select("*")
      .eq("id", photographerId)
      .single();

    if (photographerError || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found", details: photographerError },
        { status: 404 }
      );
    }

    const accessToken = await refreshGoogleToken(photographer);
    const calendarId = photographer.google_calendar_id || "primary";

    const freeBusyResponse = await fetch(
      "https://www.googleapis.com/calendar/v3/freeBusy",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: start,
          timeMax: end,
          timeZone: "Europe/Madrid",
          items: [{ id: calendarId }],
        }),
      }
    );

    const freeBusyData = await freeBusyResponse.json();
    const busy = freeBusyData.calendars?.[calendarId]?.busy || [];

    if (busy.length > 0) {
      return NextResponse.json(
        {
          error: "Photographer is busy during this slot",
          busy,
        },
        { status: 409 }
      );
    }

    const title = `${ref ? ref + " - " : ""}${propertyTitle || "Photo Shoot"}`;

    const description = [
      `Property: ${propertyTitle || ""}`,
      `Reference: ${ref || ""}`,
      `Address: ${address || ""}`,
      `Google Pin: ${googlePin || ""}`,
      `Services: ${services.join(", ")}`,
      `Agent: ${agent || ""}`,
      "",
      "Notes:",
      notes || "",
    ].join("\n");

    const eventResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: title,
          location: address || googlePin || "",
          description,
          start: {
            dateTime: start,
            timeZone: "Europe/Madrid",
          },
          end: {
            dateTime: end,
            timeZone: "Europe/Madrid",
          },
          attendees: photographer.email
            ? [{ email: photographer.email, displayName: photographer.name }]
            : [],
        }),
      }
    );

    const eventData = await eventResponse.json();

    if (!eventResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to create Google Calendar event",
          details: eventData,
        },
        { status: 500 }
      );
    }

    const { error: shootUpdateError } = await supabase
      .from("shoots")
      .update({
        photographer_id: photographerId,
        scheduled_start: start,
        scheduled_end: end,
        google_event_id: eventData.id,
        google_calendar_id: calendarId,
        sync_status: "synced",
        status: "Scheduled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", shootId);

    if (shootUpdateError) {
      return NextResponse.json(
        {
          error: "Google event created but failed to update shoot",
          googleEvent: eventData,
          details: shootUpdateError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      googleEventId: eventData.id,
      htmlLink: eventData.htmlLink,
      event: eventData,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unexpected create-event error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
