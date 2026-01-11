"use client";

import { Notice } from "@/types/notice";

interface Props {
  notices: Notice[];
}

export default function NoticeTable({ notices }: Props) {
  const toggleStatus = async (id: string) => {
    await fetch(`/api/notices/${id}/toggle`, { method: "PATCH" });
    location.reload();
  };

  return (
    <div className="bg-white rounded shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th>Type</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((n) => (
            <tr key={n._id} className="border-t">
              <td className="p-3">{n.title}</td>
              <td>{n.type}</td>
              <td className="text-blue-600">{n.department}</td>
              <td>{n.publishedOn}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    n.status === "Published"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {n.status}
                </span>
              </td>

              <td className="text-center">
                <button
                  onClick={() => toggleStatus(n._id)}
                  className="relative inline-flex h-5 w-10 items-center rounded-full bg-gray-300"
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full transition ${
                      n.status === "Published"
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
