"use client";

import { Calendar, Upload, X } from "lucide-react";

export default function CreateNoticeForm() {
  return (
    <div className="bg-white rounded-xl border">
      {/* Section Header */}
      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
        <h2 className="text-sm font-medium text-gray-700">
          Please fill in the details below
        </h2>
      </div>

      {/* Form Body */}
      <div className="p-6 space-y-6">
        {/* Target */}
        <div>
          <label className="label">
            Target Department(s) or Individual <span className="text-red-500">*</span>
          </label>
          <select className="input">
            <option>Individual</option>
            <option>Department</option>
            <option>All</option>
          </select>
        </div>

        {/* Notice Title */}
        <div>
          <label className="label">
            Notice Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Write the Title of Notice"
            className="input"
          />
        </div>

        {/* Employee Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              Select Employee ID <span className="text-red-500">*</span>
            </label>
            <select className="input">
              <option>Select employee designation</option>
            </select>
          </div>

          <div>
            <label className="label">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter employee full name"
              className="input"
            />
          </div>

          <div>
            <label className="label">
              Position <span className="text-red-500">*</span>
            </label>
            <select className="input">
              <option>Select employee department</option>
            </select>
          </div>
        </div>

        {/* Notice Type + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              Notice Type <span className="text-red-500">*</span>
            </label>
            <select className="input">
              <option>Select Notice Type</option>
            </select>
          </div>

          <div>
            <label className="label">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input type="date" className="input pr-10" />
              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Notice Body */}
        <div>
          <label className="label">Notice Body</label>
          <textarea
            rows={4}
            placeholder="Write the details about notice"
            className="input resize-none"
          />
        </div>

        {/* Upload */}
        <div>
          <label className="label">Upload Attachments (optional)</label>

          <div className="border-2 border-dashed border-teal-400 rounded-lg p-6 text-center">
            <Upload className="mx-auto text-teal-500 mb-2" />
            <p className="text-sm text-teal-600 font-medium">
              Upload nominee profile image or drag and drop.
            </p>
            <p className="text-xs text-gray-400">
              Accepted File Type: jpg, png
            </p>
          </div>

          {/* Uploaded file preview */}
          <div className="flex items-center gap-2 mt-3 bg-gray-100 px-3 py-2 rounded-md w-fit">
            <span className="text-sm text-gray-600">
              Policy_Document.pdf
            </span>
            <X size={14} className="cursor-pointer text-gray-400" />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-outline">Save as Draft</button>
        <button className="btn-primary">Publish Notice</button>
      </div>
    </div>
  );
}
