import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo/Logo.png";
import {
  LayoutDashboard,
  Users,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white min-h-screen hidden md:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <Image
          src={logo}
          alt="User logo"
          className=""
        />
      </div>

      {/* Navigation */}
      <nav className="p-4 text-sm space-y-1">
        {/* Dashboard */}
        <SidebarItem
          href="/"
          icon={<LayoutDashboard size={16} />}
          label="Dashboard"
          active
        />

        {/* Employee Section */}
        <SidebarSection title="">
          <div className="relative">
            {/* Icon */}
            <Users
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            {/* Select */}
            <select
              id="noticeType"
              name="noticeType"
              className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="">Employee</option>
              <option value="Employee Database">Employee Database</option>
              <option value="Add New Employee">Add New Employee</option>
              <option value="Performance Report">Performance Report</option>
              <option value="Performance History">Performance History</option>
            </select>
          </div>
        </SidebarSection>


        {/* Notice Section */}
        <SidebarSection title="">
          <SidebarItem
            href="/notices/create"
            icon={<FileText size={16} />}
            label="Notice Board"
          />
          {/* <SidebarItem
            href="/notices/create"
            icon={<Briefcase size={16} />}
            label="Create Notice"
          /> */}
        </SidebarSection>
      </nav>
    </aside>
  );
}

/* ---------------- Sub Components ---------------- */

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded transition
        ${active
          ? "bg-teal-50 text-teal-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="px-3 mb-1 text-xs uppercase text-gray-400">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
