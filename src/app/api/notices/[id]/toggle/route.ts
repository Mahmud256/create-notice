import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/lib/notice.model";
import mongoose from "mongoose";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    // ✅ Extract ID from URL directly (NO params dependency)
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 2]; // /notices/{id}/toggle

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid notice id" },
        { status: 400 }
      );
    }

    const notice = await Notice.findById(id);

    if (!notice) {
      return NextResponse.json(
        { message: "Notice not found" },
        { status: 404 }
      );
    }

    notice.status =
      notice.status === "published" ? "unpublished" : "published";

    await notice.save();

    return NextResponse.json(
      {
        message: "Status updated successfully",
        status: notice.status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toggle error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
