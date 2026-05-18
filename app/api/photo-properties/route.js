import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .insert([
      {
        title: body.title || "",
        address: body.address || "",
        city: body.city || "",
        shoot_date: body.shoot_date || null,
        photographer: body.photographer || "",
        agent: body.agent || "",
        status: body.status || "needs_scheduling",
        priority: body.priority || "normal",
        billing_status: body.billing_status || "not_billed",
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
