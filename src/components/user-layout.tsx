import * as React from "react";
import Header from "@/components/header.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col w-full">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
