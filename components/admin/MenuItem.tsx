import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: () => void;
}

export function MenuItem({ icon: Icon, label, href, onClick }: MenuItemProps) {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Icon className="h-5 w-5 text-gray-600" />
        <span className="text-gray-800 font-medium">{label}</span>
      </Link>
    </li>
  );
}