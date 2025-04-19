import React from 'react';
import { MenuItem } from './MenuItem';
import { HomeIcon, WrenchIcon, BookOpenIcon, SearchIcon } from 'lucide-react';

const menuItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: WrenchIcon, label: 'Orders', href: '/admin/orders' },
  { icon: BookOpenIcon, label: 'Manage Stores', href: '/admin/stores' },
  { icon: SearchIcon, label: 'Manage Requests', href: '/admin/requests' },
];

export function Sidebar() {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-full">
      <ul className="space-y-1 mt-4">
        {menuItems.map(({ icon, label, href }) => (
          <MenuItem key={label} icon={icon} label={label} href={href} />
        ))}
      </ul>
    </nav>
  );
}