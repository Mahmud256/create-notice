"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

interface HeaderProps {
  userName?: string;
  role?: string;
  notificationCount?: number;
}

export default function Header({
  userName = "Asif Riaj",
  role = "HR",
  notificationCount = 3,
}: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left Greeting */}
      <div>
        <p className="text-sm text-gray-500">{getGreeting()}</p>
        <h2 className="font-semibold text-gray-800">
          {userName}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm leading-tight">
            <p className="font-medium text-gray-800">
              {userName}
            </p>
            <p className="text-xs text-gray-400">
              {role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
