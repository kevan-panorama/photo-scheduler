import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/google/organizer/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(tokenData, { status: 500 });
  }

  await supabaseAdmin
    .from("calendar_accounts")
    .update({
      google_access_token: tokenData.access_token,
      google_refresh_token: tokenData.refresh_token,
      google_token_expires_at: new Date(
        Date.now() + tokenData.expires_in * 1000
      ).toISOString(),
    })
    .eq("role", "panorama_organizer");

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/photo-scheduler?organizer_connected=true`
  );
}
