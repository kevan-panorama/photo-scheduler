import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "Missing property id" }, { status: 400 });
  }

  if (!body.delivery_link) {
    return NextResponse.json({ error: "Missing delivery link" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .update({
      delivery_link: body.delivery_link,
      status: "delivered",
      delivered_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
