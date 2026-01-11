import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/lib/notice.model";

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const notice = await Notice.findById(params.id);
  notice.status =
    notice.status === "Published" ? "Unpublished" : "Published";

  await notice.save();
  return NextResponse.json(notice);
}
