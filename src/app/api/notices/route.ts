// /api/notices/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/lib/notice.model";

/* -------- POST: Create Notice -------- */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      noticeType,
      department,
      employeeId,
      employeeName,
      position,
      publishDate,
      body: noticeBody,
    } = body;

    if (
      !title ||
      !noticeType ||
      !department ||
      !employeeId ||
      !employeeName ||
      !position ||
      !publishDate
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const notice = await Notice.create({
      title,
      noticeType,
      department,
      employeeId,
      employeeName,
      position,
      publishDate,
      body: noticeBody,
    });

    return NextResponse.json(
      { message: "Notice created successfully", notice },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* -------- GET: Fetch Notices -------- */
export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ createdAt: -1 });

    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}
