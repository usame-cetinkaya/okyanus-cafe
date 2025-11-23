import * as React from "react";
import Header from "@/components/header.tsx";
import { AdminSidebar } from "@/components/admin-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
