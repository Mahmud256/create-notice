"use client";

import { useRouter } from "next/navigation";
import CreateNoticeForm from "@/components/CreateNoticeForm";

export default function CreateNoticePage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="border rounded-md p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Go back"
        >
          ←
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Create a Notice
        </h1>
      </div>

      <CreateNoticeForm />
    </div>
  );
}
