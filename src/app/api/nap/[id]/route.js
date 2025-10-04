import { updateElasticByType } from "@/utils";
import { NextResponse } from "next/server";

export async function DELETE(requets, { params }) {
  try {
    const res = await updateElasticByType(params.id, {
      type: "nap_deleted",
    });
    return NextResponse.json({ message: "SIESTA ELIMINADA", id: params.id, res });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(requets, { params }) {
  try {
    let data = await requets.json();
    const res = await updateElasticByType(params.id, data);
    return NextResponse.json({ message: "SIESTA ACTUALIZADA", id: params.id, res });
  } catch (error) {
    return NextResponse.json(error);
  }
}
