"use client";

import { useState } from "react";
import Sidebar from "@/components/reusable/Sidebar";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-white text-black relative">
      {/* Hamburger for mobile */}
      <button
        className="absolute top-4 left-4 z-30 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 bg-white w-72 transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}