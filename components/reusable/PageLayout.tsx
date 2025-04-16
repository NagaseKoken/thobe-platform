import Sidebar from "@/components/reusable/Sidebar";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-dvh bg-white text-black">
      <aside className="border-r border-gray-200">
        <Sidebar />
      </aside>

      <main
        role="main"
        aria-label="Page content"
        className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
      >
        {children}
      </main>
    </div>
  );
}