import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("property_id");

  let query = supabaseAdmin
    .from("photo_notes")
    .select("*")
    .order("created_at", { ascending: true });

  if (propertyId) {
    query = query.eq("property_id", propertyId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("photo_notes")
    .insert([
      {
        property_id: body.property_id,
        author: body.author || "Team",
        message: body.message,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
