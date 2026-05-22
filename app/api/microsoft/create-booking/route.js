import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(process.env.POWER_AUTOMATE_BOOKING_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-photo-scheduler-secret": process.env.POWER_AUTOMATE_SECRET,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: "Power Automate booking failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      flowResponse: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected create-booking error", details: error.message },
      { status: 500 }
    );
  }
}
