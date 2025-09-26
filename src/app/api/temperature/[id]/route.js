import { updateElasticByType } from "@/utils";
import { NextResponse } from "next/server";

export async function DELETE(requets, { params }) {
  try {
    const res = await updateElasticByType(params.id, {
      type: "temperature_deleted",
    });
    return NextResponse.json({ message: "DELETE 2", id: params.id, res });
  } catch (error) {
    return NextResponse.json(error);
  }
}
