"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TopNavbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#ffffff] text-black">
      {/* Left: Logo */}
      <div className="text-xl font-bold tracking-wide">THOBEMARKET</div>

      {/* Center: Navigation Links */}
      <nav className="space-x-8 hidden md:flex text-sm font-medium">
        <Link href="#" className="hover:text-red-400 transition flex items-center gap-1">
            Home <span className="text-xs">▼</span>
        </Link>
        <Link href="#" className="hover:text-red-400 transition flex items-center gap-1">
            About <span className="text-xs">▼</span>
        </Link>
        <Link href="#" className="hover:text-red-400 transition flex items-center gap-1">
            Contact <span className="text-xs">▼</span>
        </Link>
        <Link href="#" className="hover:text-red-400 transition flex items-center gap-1">
            Help <span className="text-xs">▼</span>
        </Link>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}