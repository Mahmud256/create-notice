import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  PlusSquare,
  Briefcase,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-2xl font-bold text-teal-700">LOGO</h1>
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
        <SidebarSection title="Employee">
          <SidebarItem
            href="/employees"
            icon={<Users size={16} />}
            label="Employee Database"
          />
          <SidebarItem
            href="/employees/create"
            icon={<PlusSquare size={16} />}
            label="Add New Employee"
          />
        </SidebarSection>

        {/* Notice Section */}
        <SidebarSection title="Notice">
          <SidebarItem
            href="/notices"
            icon={<FileText size={16} />}
            label="Notice Board"
          />
          <SidebarItem
            href="/notices/create"
            icon={<Briefcase size={16} />}
            label="Create Notice"
          />
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
        ${
          active
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
