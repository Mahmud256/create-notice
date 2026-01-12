// lib/notice.model.ts
import mongoose, { Schema, models } from "mongoose";

const NoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    noticeType: { type: String, required: true },
    department: { type: String, required: true },

    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    position: { type: String, required: true },

    publishDate: { type: String, required: true },
    body: { type: String },

    // ✅ NEW
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },

  },
  { timestamps: true }
);

export default models.Notice || mongoose.model("Notice", NoticeSchema);

