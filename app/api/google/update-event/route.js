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

  if (!response.ok) {
    throw new Error(data.error_description || data.error || "Token refresh failed");
  }

  return data.access_token;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      photographerId,
      googleEventId,
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

    if (!photographerId || !googleEventId || !start || !end) {
      return NextResponse.json(
        { error: "Missing required fields for update" },
        { status: 400 }
      );
    }

    const { data: photographer, error: photographerError } = await supabaseAdmin
      .from("photographers")
      .select("*")
      .eq("id", photographerId)
      .single();

    if (photographerError || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found" },
        { status: 404 }
      );
    }

    const accessToken = await refreshGoogleToken(photographer);

    const calendarId = photographer.google_calendar_id || "primary";

    const googleResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events/${encodeURIComponent(googleEventId)}?sendUpdates=all`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `${ref ? `${ref} - ` : ""}${propertyTitle || "Photo Shoot"}`,
          location: address || googlePin || "",
          description: [
            `Property: ${propertyTitle || ""}`,
            `Reference: ${ref || ""}`,
            `Address: ${address || ""}`,
            `Google Pin: ${googlePin || ""}`,
            `Services: ${services.join(", ")}`,
            `Agent: ${agent || ""}`,
            "",
            "Notes:",
            notes || "",
          ].join("\n"),
          start: {
            dateTime: start,
            timeZone: "Europe/Madrid",
          },
          end: {
            dateTime: end,
            timeZone: "Europe/Madrid",
          },
        }),
      }
    );

    const googleData = await googleResponse.json();

    if (!googleResponse.ok) {
      return NextResponse.json(
        {
          error: "Google Calendar update failed",
          details: googleData,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      googleEventId: googleData.id,
      htmlLink: googleData.htmlLink,
      event: googleData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected update-event error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
