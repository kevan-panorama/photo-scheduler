import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();

    const photographerId = body.photographerId;

    if (!photographerId) {
      return NextResponse.json(
        { error: "Missing photographerId" },
        { status: 400 }
      );
    }

    const { data: photographer, error } = await supabaseAdmin
      .from("photographers")
      .select("*")
      .eq("id", photographerId)
      .single();

    if (error || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found" },
        { status: 404 }
      );
    }

    const hasMicrosoft = Boolean(photographer.microsoft_refresh_token);
    const hasGoogle = Boolean(photographer.google_refresh_token);

    let targetUrl = null;
    let provider = null;

    if (hasMicrosoft) {
      provider = "microsoft";
      targetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/microsoft/create-booking`;
    } else if (hasGoogle) {
      provider = "google";
      targetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/google/create-event`;
    } else {
      return NextResponse.json(
        { error: "No connected calendar for this photographer" },
        { status: 400 }
      );
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        calendarProvider: provider,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `${provider} booking failed`,
          details: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      provider,
      ...data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected smart booking error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
