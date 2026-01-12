"use client";

import Image from "next/image";
import { Notice } from "@/types/notice";
import { Eye, MoreVertical } from "lucide-react";
import mage_edit from "../../public/icon/mage_edit.svg";

interface Props {
  notices: Notice[];
}

export default function NoticeTable({ notices }: Props) {
  const toggleStatus = async (id: string) => {
    await fetch(`/api/notices/${id}/toggle`, {
      method: "PATCH",
    });

    location.reload(); // simple & safe
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3" />
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Notice Type</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Published On</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((n) => {
            const isPublished = n.status === "published";

            return (
              <tr key={n._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4" />
                <td className="px-4 py-4 font-medium">{n.title}</td>
                <td className="px-4 py-4">{n.noticeType}</td>
                <td className="px-4 py-4 text-blue-600">{n.department}</td>
                <td className="px-4 py-4">{n.publishDate}</td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isPublished
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Eye size={18} />

                    <div className="relative group">
                      <Image
                        src={mage_edit}
                        alt="edit"
                        width={18}
                        height={18}
                      />

                      <div className="absolute top-full right-0 flex items-center gap-3 bg-white border rounded-md px-3 py-2 opacity-0 group-hover:opacity-100">
                        <span className="text-xs font-semibold">
                          {isPublished ? "Published" : "Unpublished"}
                        </span>

                        <button
                          onClick={() => toggleStatus(n._id)}
                          className={`h-5 w-10 rounded-full ${
                            isPublished ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`block h-4 w-4 bg-white rounded-full transform ${
                              isPublished
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <MoreVertical size={18} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
