"use client";

import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import ToastProvider from "@/components/providers/ToastProvider";
import { usePathname } from "next/navigation";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // For the login page, only wrap with ToastProvider, not the admin layout
  if (pathname === "/admin/login") {
    return (
      <>
        <ToastProvider />
        {children}
      </>
    );
  }
  
  // For all other admin pages, use the full admin layout
  return (
    <>
      <ToastProvider />
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </>
  );
}
