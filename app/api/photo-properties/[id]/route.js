import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function PATCH(req, { params }) {
  const { id } = params;

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("photo_properties")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
