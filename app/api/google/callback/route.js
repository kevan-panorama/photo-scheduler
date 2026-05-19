import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const photographerId = searchParams.get("state");

    if (!code || !photographerId) {
      return NextResponse.json(
        {
          error: "Missing code or photographerId",
        },
        { status: 400 }
      );
    }

    // Exchange Google auth code for tokens
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google token exchange failed:", tokenData);

      return NextResponse.json(
        {
          error: "Google token exchange failed",
          details: tokenData,
        },
        { status: 500 }
      );
    }

    const expiresAt = new Date(
      Date.now() + tokenData.expires_in * 1000
    ).toISOString();

    // Save tokens into Supabase
    const { error } = await supabase
      .from("photographers")
      .update({
        google_access_token: tokenData.access_token,
        google_refresh_token: tokenData.refresh_token,
        google_token_expires_at: expiresAt,
        google_calendar_id: "primary",
      })
      .eq("id", photographerId);

    if (error) {
      console.error("Supabase update error:", error);

      return NextResponse.json(
        {
          error: "Failed to save Google tokens",
          details: error,
        },
        { status: 500 }
      );
    }

    // Redirect back to app
    return NextResponse.redirect(
      "https://photo-scheduler-chi.vercel.app/"
    );
  } catch (err) {
    console.error("Google callback route error:", err);

    return NextResponse.json(
      {
        error: "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
