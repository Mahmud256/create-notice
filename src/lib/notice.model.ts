import mongoose, { Schema } from "mongoose";

const NoticeSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, default: "Published" },
  publishedOn: { type: String, default: new Date().toDateString() },
});

export default mongoose.models.Notice ||
  mongoose.model("Notice", NoticeSchema);
