import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 bg-gray-100 flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
