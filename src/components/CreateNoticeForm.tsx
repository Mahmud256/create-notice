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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const requiredFields: (keyof NoticeForm)[] = [
    "title",
    "noticeType",
    "department",
    "employeeId",
    "employeeName",
    "position",
    "publishDate",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    setError("");
  };

  const submitPayload = async (isDraft = false) => {
    if (!isDraft) {
      for (const field of requiredFields) {
        if (!form[field]) {
          setError("All required fields must be filled");
          return;
        }
      }
    }

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, isDraft }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      resetForm();
    } catch {
      setError("Something went wrong. Please try again.");
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
        <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <h2 className="text-sm font-medium text-gray-700">
            Please fill in the details below
          </h2>
        </div>

        {error && <p className="text-red-500 px-6 mt-3">{error}</p>}

        <div className="space-y-6 p-6">
          {/* Department */}
          <div className="bg-[#f5f6fa] p-4 rounded-lg border">
            <label className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Target Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 bg-[#f5f6fa]"
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

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Notice title"
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

          {/* Attachment (UI only) */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Attachments (optional)
            </label>

            <div
              role="button"
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

                className="hidden"
              />
            </div>

            {/* Uploaded Files */}
            <div className="mt-3 space-y-2">
              <div
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full w-fit"
              >
                <Image src={attachmentIcon} alt="file" width={16} height={16} />
                <span className="text-sm">Policy_Document.pdf</span>
                <X size={14} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full"
          >
            Publish Notice
          </button>
        </div>
      </form>

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </>
  );
}
