"use client";

import Image from "next/image";
import { useState } from "react";
import { Notice } from "@/types/notice";
import { Eye, MoreVertical } from "lucide-react";
import mage_edit from "../../public/icon/mage_edit.svg";

interface Props {
  notices: Notice[];
}

export default function NoticeTable({ notices }: Props) {
  // Local status state (true = Published, false = Unpublished)
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    notices.forEach((n) => {
      map[n._id] = false; // default OFF (Unpublished)
    });
    return map;
  });

  const toggleStatus = (id: string) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        {/* Table Head */}
        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-600">
            <th className="px-4 py-3">
              <input type="checkbox" className="h-4 w-4 rounded" />
            </th>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Notice Type</th>
            <th className="px-4 py-3 text-left font-medium">
              Departments / Individual
            </th>
            <th className="px-4 py-3 text-left font-medium">Published On</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {notices.map((n) => {
            const isPublished = statusMap[n._id];

            return (
              <tr
                key={n._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* Checkbox */}
                <td className="px-4 py-8">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>

                {/* Title */}
                <td className="px-4 py-4 text-gray-800 font-medium">
                  {n.title}
                </td>

                {/* Type */}
                <td className="px-4 py-4 text-gray-500">
                  {n.noticeType}
                </td>

                {/* Department */}
                <td className="px-4 py-4">
                  <span className="text-blue-600 font-medium">
                    {n.department}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-gray-500">
                  {n.publishDate}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isPublished
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
                    {/* Eye */}
                    <Eye size={18} className="text-gray-500 hover:text-blue-600 cursor-pointer" />

                    {/* mage_edit + Hover Panel */}
                    <div className="relative group flex flex-col items-center">
                      {/* mage_edit Icon */}
                      <Image
                        src={mage_edit}
                        alt="mage_edit"
                        width={18}
                        height={18}
                        className="cursor-pointer"
                      />

                      {/* Hover Panel */}
                      <div
                        className="absolute top-full right-1/2 
        flex items-center gap-4
        border border-gray-300 bg-white rounded-md px-4 py-2
        shadow-sm
        opacity-0 scale-95 pointer-events-none
        transition
        group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                      >
                        {/* Status Text */}
                        <span
                          className={`text-xs font-semibold ${isPublished ? "text-green-600" : "text-gray-600"
                            }`}
                        >
                          {isPublished ? "Published" : "Unpublished"}
                        </span>

                        {/* Toggle */}
                        <button
                          onClick={() => toggleStatus(n._id)}
                          className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${isPublished ? "bg-green-500" : "bg-gray-300"
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isPublished ? "translate-x-5" : "translate-x-1"
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* More */}
                    <MoreVertical
                      size={18}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    />
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
