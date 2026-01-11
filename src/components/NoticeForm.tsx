"use client";

import { useState } from "react";
import SuccessModal from "./SuccessModal";

export default function NoticeForm() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    department: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.department) {
      setError("All fields are required");
      return;
    }

    await fetch("/api/notices", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setSuccess(true);
    setForm({ title: "", type: "", department: "" });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow max-w-lg"
      >
        <h2 className="text-lg font-semibold mb-4">
          Create Notice
        </h2>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Notice Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="">Select Notice Type</option>
          <option>General</option>
          <option>HR & Policy</option>
          <option>Finance</option>
          <option>Emergency</option>
        </select>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Department / Individual"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Publish Notice
        </button>
      </form>

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </>
  );
}
