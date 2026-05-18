import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Marbella";

  return NextResponse.json({
    city,
    weather: "Weather placeholder",
    temperature: null,
    note: "Real forecast API will be connected later.",
  });
}
