"use client"
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/auth/login";

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-sidebar-foreground">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          {/* <Navbar /> */}

          <main
            className={`flex-1 min-h-screen overflow-auto ${isLogin ? "p-0" : "p-8"}`}
          >
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </ProtectedRoute>
  );
}
