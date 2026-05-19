import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function refreshGoogleToken(photographer) {
  const tokenExpiry = photographer.google_token_expires_at
    ? new Date(photographer.google_token_expires_at).getTime()
    : 0;

  const stillValid = tokenExpiry > Date.now() + 60 * 1000;

  if (stillValid && photographer.google_access_token) {
    return photographer.google_access_token;
  }

  if (!photographer.google_refresh_token) {
    throw new Error(`Missing refresh token for ${photographer.name}`);
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: photographer.google_refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to refresh token for ${photographer.name}: ${JSON.stringify(data)}`
    );
  }

  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();

  await supabase
    .from("photographers")
    .update({
      google_access_token: data.access_token,
      google_token_expires_at: expiresAt,
    })
    .eq("id", photographer.id);

  return data.access_token;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const start =
      searchParams.get("start") || new Date().toISOString();

    const end =
      searchParams.get("end") ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const { data: photographers, error } = await supabase
      .from("photographers")
      .select("*")
      .eq("is_active", true)
      .not("google_refresh_token", "is", null);

    if (error) {
      return NextResponse.json(
        { error: "Failed to load photographers", details: error },
        { status: 500 }
      );
    }

    const results = [];

    for (const photographer of photographers || []) {
      try {
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

        if (!freeBusyResponse.ok) {
          results.push({
            photographerId: photographer.id,
            photographerName: photographer.name,
            email: photographer.email,
            color: photographer.color,
            connected: true,
            error: freeBusyData,
            busy: [],
          });

          continue;
        }

        const busy =
          freeBusyData.calendars?.[calendarId]?.busy || [];

        results.push({
          photographerId: photographer.id,
          photographerName: photographer.name,
          email: photographer.email,
          color: photographer.color,
          connected: true,
          busy,
        });
      } catch (err) {
        results.push({
          photographerId: photographer.id,
          photographerName: photographer.name,
          email: photographer.email,
          color: photographer.color,
          connected: false,
          error: err.message,
          busy: [],
        });
      }
    }

    return NextResponse.json({
      start,
      end,
      photographers: results,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unexpected availability error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
