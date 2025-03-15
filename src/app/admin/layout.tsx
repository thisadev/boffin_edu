"use client";

import SessionProvider from "@/components/providers/SessionProvider";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import ToastProvider from "@/components/providers/ToastProvider";
import { usePathname } from "next/navigation";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // For the login page, only wrap with SessionProvider, not the admin layout
  if (pathname === "/admin/login") {
    return (
      <SessionProvider>
        <ToastProvider />
        {children}
      </SessionProvider>
    );
  }
  
  // For all other admin pages, use the full admin layout
  return (
    <SessionProvider>
      <ToastProvider />
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </SessionProvider>
  );
}
