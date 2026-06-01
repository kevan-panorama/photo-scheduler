import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const photographerId = searchParams.get("photographerId");

  if (!photographerId) {
    return NextResponse.json({ error: "Missing photographerId" }, { status: 400 });
  }

  const params = new URLSearchParams({
    client_id: process.env.MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
    response_mode: "query",
    scope: "offline_access User.Read Calendars.ReadWrite",
    state: photographerId,
  });

  return NextResponse.redirect(
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`
  );
}
