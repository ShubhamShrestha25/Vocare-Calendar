import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const pastData = url.searchParams.get("pastData") === "true";


  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  let query = supabase
    .from("appointments")
    .select("*")
    .order("start", { ascending: true });

  if (!pastData) {
    query = query.gte("start", startOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

export async function POST(req) {
  const form = await req.json();
  const { error } = await supabase.from("appointments").insert(form);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Erstellt" }, { status: 200 });
}
