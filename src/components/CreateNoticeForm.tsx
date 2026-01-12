"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SuccessModal from "./SuccessModal";
import uploadIcon from "../../public/icon/upload.svg";
import attachmentIcon from "../../public/icon/attachment.svg";
import { X } from "lucide-react";

interface NoticeForm {
  title: string;
  noticeType: string;
  department: string;
  employeeId: string;
  employeeName: string;
  position: string;
  publishDate: string;
  body: string;
}

export default function CreateNoticeForm() {
  const [form, setForm] = useState<NoticeForm>({
    title: "",
    noticeType: "",
    department: "",
    employeeId: "",
    employeeName: "",
    position: "",
    publishDate: "",
    body: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const requiredFields = [
    "title",
    "noticeType",
    "department",
    "employeeId",
    "employeeName",
    "position",
    "publishDate",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      noticeType: "",
      department: "",
      employeeId: "",
      employeeName: "",
      position: "",
      publishDate: "",
      body: "",
    });
    setAttachments([]);
    setError("");
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAttachments((prev) => [...prev, ...Array.from(e.target.files)]);
    e.target.value = "";
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      setAttachments((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  const submitPayload = async (isDraft = false) => {
    // Validate required fields for publish (but allow missing when saving draft)
    if (!isDraft) {
      for (const field of requiredFields) {
        if (!form[field as keyof NoticeForm]) {
          setError("All required fields must be filled");
          return false;
        }
      }
    }

    try {
      let res: Response;
      if (attachments.length > 0) {
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) =>
          formData.append(k, v as string)
        );
        formData.append("isDraft", String(isDraft));
        attachments.forEach((file) => formData.append("attachments", file));
        res = await fetch("/api/notices", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/notices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, isDraft }),
        });
      }

      if (!res.ok) throw new Error("Failed to create notice");

      setSuccess(true);
      resetForm();
      return true;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      return false;
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    await submitPayload(false);
  };

  const saveDraft = async () => {
    setError("");
    await submitPayload(true);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl border border-gray-300"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 bg-gray-50 rounded-t-xl">
          <h2 className="text-sm font-medium text-gray-700">
            Please fill in the details below
          </h2>
        </div>

        {error && <p className="text-red-500 mb-3 px-6">{error}</p>}

        <div className="space-y-6 p-6">
          {/* Target */}
          <div className="rounded-lg bg-[#f5f6fa] p-4 border">
            <label htmlFor="department" className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Target Department / Individual
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-[#f5f6fa]"
            >
              <option value="">Select target</option>
              <option value="All Department">All Department</option>
              <option value="Finance">Finance</option>
              <option value="Sales Team">Sales Team</option>
              <option value="Web Team">Web Team</option>
              <option value="Database Team">Database Team</option>
              <option value="Admin">Admin</option>
              <option value="Individual">Individual</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Notice Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Write the title of the notice"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Employee Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Employee ID
              </label>
              <select
                id="employeeId"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select employee ID</option>
                <option value="EMP-001">EMP-001</option>
                <option value="EMP-002">EMP-002</option>
                <option value="EMP-003">EMP-003</option>
              </select>
            </div>

            <div>
              <label htmlFor="employeeName" className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <input
                id="employeeName"
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                placeholder="Employee full name"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Position
              </label>
              <select
                id="position"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select position</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>
          </div>

          {/* Notice Type & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="noticeType" className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <select
                id="noticeType"
                name="noticeType"
                value={form.noticeType}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select notice type</option>
                <option value="Warning / Disciplinary">Warning / Disciplinary</option>
                <option value="Performance Improvement">Performance Improvement</option>
                <option value="Appreciation / Recognition">Appreciation / Recognition</option>
                <option value="Attendance / Leave Issue">Attendance / Leave Issue</option>
                <option value="Payroll / Compensation">Payroll / Compensation</option>
                <option value="Contract / Role Update">Contract / Role Update</option>
                <option value="Advisory / Personal Reminder">Advisory / Personal Reminder</option>
              </select>
            </div>

            <div>
              <label htmlFor="publishDate" className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Publish Date
              </label>
              <input
                id="publishDate"
                type="date"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Notice Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-semibold mb-2">
              Notice Body
            </label>
            <textarea
              id="body"
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={5}
              placeholder="Write the notice details"
              className="w-full rounded-md border px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Attachments (optional)
            </label>

            <div
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-[#10b981] rounded-lg p-6 text-center cursor-pointer hover:bg-green-50 transition"
            >
              <Image
                src={uploadIcon}
                alt="Upload"
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <p className="text-sm">
                <span className="text-[#10b981] font-medium">Upload</span> or drag and drop files
              </p>
              <p className="text-xs text-gray-400">Accepted: jpg, png, pdf</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.png,.pdf"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </div>

            {/* Uploaded Files */}
            <div className="mt-3 space-y-2">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full w-fit"
                >
                  <Image src={attachmentIcon} alt="file" width={16} height={16} />
                  <span className="text-sm">{file.name}</span>
                  <X size={14} className="cursor-pointer" onClick={() => removeAttachment(idx)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer (inside form so submit works) */}
        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            type="button"
            onClick={resetForm}
            className="border px-4 py-2 rounded-full"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={saveDraft}
            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full"
          >
            Save as Draft
          </button>

          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-full">
            Publish Notice
          </button>
        </div>
      </form>

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </>
  );
}
