import { buscarElasticByType, crearElasticByType } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await buscarElasticByType("nap");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(requets) {
  try {
    let data = await requets.json();
    const els_request = await crearElasticByType(data, "nap");
    return NextResponse.json({ message: "POST", els_request });
  } catch (error) {
    return NextResponse.json(error);
  }
}
