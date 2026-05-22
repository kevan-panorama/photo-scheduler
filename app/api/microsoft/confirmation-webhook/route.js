import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const secret = req.headers.get("x-photo-scheduler-secret");

    if (secret !== process.env.POWER_AUTOMATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      shootId,
      responseStatus,
      outlookEventId,
      outlookEventLink,
      start,
    } = body;

    if (!shootId || !responseStatus) {
      return NextResponse.json(
        { error: "Missing shootId or responseStatus" },
        { status: 400 }
      );
    }

    let nextStatus = "needs_confirmation";

    if (responseStatus === "accepted") nextStatus = "scheduled";
    if (responseStatus === "declined") nextStatus = "needs_confirmation";
    if (responseStatus === "tentative") nextStatus = "needs_confirmation";

    const { data, error } = await supabaseAdmin
      .from("photo_properties")
      .update({
        status: nextStatus,
        shoot_date: start || undefined,
        google_event_id: outlookEventId || undefined,
        google_event_link: outlookEventLink || undefined,
      })
      .eq("id", shootId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update property", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      property: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected confirmation webhook error", details: error.message },
      { status: 500 }
    );
  }
}
