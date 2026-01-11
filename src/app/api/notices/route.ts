import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/lib/notice.model";

export async function GET() {
  await connectDB();
  const notices = await Notice.find().limit(5).sort({ _id: -1 });
  return NextResponse.json(notices);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const notice = await Notice.create(body);
  return NextResponse.json(notice);
}
