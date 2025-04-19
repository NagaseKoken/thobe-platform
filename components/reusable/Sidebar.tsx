"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Trash2, PenLine, X } from "lucide-react";

const sidebarLinks = [
  { icon: <FileText size={20} />, label: "View Orders", href: "/orders" },
  { icon: <PlusCircle size={20} />, label: "Add products & fabrics", href: "/products" },
  { icon: <Trash2 size={20} />, label: "Delete products & fabrics", href: "/delete" },
  { icon: <PenLine size={20} />, label: "Make a complaint", href: "/complaint" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string) => {
    if (href === pathname) {
      router.replace(href + "?refresh=true");
    } else {
      router.push(href);
    }

    if (onClose) onClose();
  };

  return (
    <aside className="h-full w-full md:w-80 bg-white text-black px-6 py-10 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>


      <nav role="navigation" aria-label="Sidebar menu" className="flex flex-col space-y-3">
        {sidebarLinks.map((link, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleClick(link.href)}
            className="justify-start px-3 text-left w-full text-base transition hover:bg-gray-200"
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
