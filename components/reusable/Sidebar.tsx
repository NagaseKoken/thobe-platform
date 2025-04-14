"use client";

import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Trash2, PenLine } from "lucide-react";

const sidebarLinks = [
  { icon: <FileText size={18} />, label: "View Orders" },
  { icon: <PlusCircle size={18} />, label: "Add products & fabrics" },
  { icon: <Trash2 size={18} />, label: "Delete products & fabrics" },
  { icon: <PenLine size={18} />, label: "Make a complaint" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#ffffff] text-black p-6">
      <nav className="flex flex-col space-y-2">
        {sidebarLinks.map((link, index) => (
          <Button
            key={index}
            variant="ghost"
            className="justify-start px-3 text-left hover:bg-gray-200 transition w-full"
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}