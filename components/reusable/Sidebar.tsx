"use client";

import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Trash2, PenLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const sidebarLinks = [
  { icon: <FileText size={20} />, label: "View Orders", href: "/orders" },
  { icon: <PlusCircle size={20} />, label: "Add products & fabrics", href: "/products" },
  { icon: <Trash2 size={20} />, label: "Delete products & fabrics", href: "#" },
  { icon: <PenLine size={20} />, label: "Make a complaint", href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-white text-black px-6 py-10 border-r border-gray-200">
      <nav role="navigation" aria-label="Sidebar menu" className="flex flex-col space-y-3">
        {sidebarLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            <Button
              variant="ghost"
              className={clsx(
                "justify-start px-3 text-left w-full text-base transition hover:bg-gray-200",
                pathname === link.href && "bg-gray-100 font-semibold"
              )}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}