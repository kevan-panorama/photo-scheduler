import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const photographerId = searchParams.get("state");

  if (!code || !photographerId) {
    return NextResponse.json({ error: "Missing code or photographerId" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      code,
      redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(tokenData, { status: 500 });
  }

  const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const profile = await profileResponse.json();

  const { error } = await supabaseAdmin
    .from("photographers")
    .update({
      microsoft_access_token: tokenData.access_token,
      microsoft_refresh_token: tokenData.refresh_token,
      microsoft_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      microsoft_calendar_id: "primary",
      calendar_provider: "microsoft",
      email: profile.mail || profile.userPrincipalName || undefined,
    })
    .eq("id", photographerId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/connect/success?provider=microsoft`
  );
}
