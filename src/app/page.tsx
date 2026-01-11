import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Page Content */}
        <main className="p-6">
          {/* Title + Actions */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-semibold">Notice Management</h1>
              <p className="text-sm text-gray-500">
                Active Notices 8 · Draft Notices 4
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href="/notices/create"
                className="bg-orange-500 text-white px-4 py-2 rounded text-sm"
              >
                + Create Notice
              </Link>

              <button className="border px-4 py-2 rounded text-sm">
                All Draft Notice
              </button>
            </div>
          </div>

          {/* Table Placeholder */}
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400">
            Notice Table Will Render Here
          </div>
        </main>
      </div>
    </div>
  );
}
