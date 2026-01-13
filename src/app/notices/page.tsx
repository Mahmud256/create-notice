import NoticeTable from "@/components/NoticeTable";
import { Notice } from "@/types/notice";

async function getNotices(): Promise<Notice[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notices`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">
        Notice Management
      </h1>
      <NoticeTable notices={notices} />
    </div>
  );
}
