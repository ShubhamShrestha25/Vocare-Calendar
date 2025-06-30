import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = params.id;
  const form = await req.json();

  const { error } = await supabase
    .from("appointments")
    .update(form)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Aktualisiert" }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const id = params.id;

  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Termin gelöscht" }, { status: 200 });
}
