"use client";

import Image from "next/image";
import { useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "title",
      "noticeType",
      "department",
      "employeeId",
      "employeeName",
      "position",
      "publishDate",
    ];

    for (const field of requiredFields) {
      if (!form[field as keyof NoticeForm]) {
        setError("All required fields must be filled");
        return;
      }
    }

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create notice");

      setSuccess(true);
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
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

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="space-y-6 p-6">
          {/* Target */}
          <div className="rounded-lg bg-[#f5f6fa] p-4 border">
            <label className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Target Department / Individual
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-[#f5f6fa]"
            >
              <option value="">Select target</option>
              <option value="Individual">Individual</option>
              <option value="Department">Department</option>
              <option value="All">All</option>
            </select>
          </div>

          {/* Notice Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <input
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
              <label className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Employee ID
              </label>
              <select
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
              <label className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <input
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                placeholder="Employee full name"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Position
              </label>
              <select
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
              <label className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <select
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
              <label className="block text-sm font-semibold mb-2">
                <span className="text-red-500">*</span> Publish Date
              </label>
              <input
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
            <label className="block text-sm font-semibold mb-2">
              Notice Body
            </label>
            <textarea
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
            <div className="border-2 border-dashed border-[#10b981] rounded-lg p-6 text-center cursor-pointer hover:bg-green-50 transition">
              <Image
                src={uploadIcon}
                alt="Upload"
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <p className="text-sm">
                <span className="text-[#10b981] font-medium">
                  Upload
                </span>{" "}
                or drag and drop files
              </p>
              <p className="text-xs text-gray-400">
                Accepted: jpg, png, pdf
              </p>
            </div>
             {/* Uploaded Files */}

              <div
                className="flex items-center gap-2 mt-3 bg-gray-100 px-3 py-2 rounded-full w-fit"
              >
                <Image
                  src={attachmentIcon}
                  alt="file"
                  width={16}
                  height={16}
                />
                <span className="text-sm">Policy_Document.pdf</span>
                <X
                  size={14}
                  className="cursor-pointer"
                />
              </div>

          </div>
        </div>
      </form>
      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4">
        <button
          type="button"
          className="border px-4 py-2 rounded-full"
        >
          Cancel
        </button>

        <button
          type="button"
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

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </>
  );
}

