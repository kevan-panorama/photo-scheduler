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
        status: body.status || "new_request",
        priority: body.priority || "normal",
        weather_summary: body.weather_summary || "Pending",
        billing_status: body.billing_status || "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ error: "Missing property id" }, { status: 400 });
  }

  const updateData = {
    title: body.title,
    address: body.address,
    city: body.city,
    shoot_date: body.shoot_date,
    photographer: body.photographer,
    agent: body.agent,
    status: body.status,
    priority: body.priority,
    weather_summary: body.weather_summary,
    billing_status: body.billing_status,
  };

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .update(updateData)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing property id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("photo_properties")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
