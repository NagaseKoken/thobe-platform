"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBagIcon,
  ClipboardIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/components/reusable/navbar';
import Footer from '@/components/reusable/Footer';

type OrderStatus = 'New Order' | 'Ready for Pickup' | 'In Production';

interface Order {
  id: number;
  customer: string;
  lastUpdate: string;
  status: OrderStatus;
}

const sampleOrders: Order[] = [
  { id: 1, customer: 'Mohammed Al Naser', lastUpdate: '5 Min Ago', status: 'New Order' },
  { id: 2, customer: 'Ali AlBugegey', lastUpdate: 'Yesterday', status: 'Ready for Pickup' },
  { id: 3, customer: 'Moammal Almahfoudh', lastUpdate: '2 Days Ago', status: 'In Production' },
  { id: 4, customer: 'Reda Alali', lastUpdate: '4 Days Ago', status: 'In Production' },
  { id: 5, customer: 'Husain Al Mullim', lastUpdate: '5 Days Ago', status: 'Ready for Pickup' },
  { id: 6, customer: 'Abdulrhman Al Faleh', lastUpdate: '12 Days Ago', status: 'In Production' },
  { id: 7, customer: 'Mohammed Ali', lastUpdate: 'Last Month', status: 'Ready for Pickup' },
  { id: 8, customer: 'Ahmed Mohammed', lastUpdate: '2 Months Ago', status: 'Ready for Pickup' },
  { id: 9, customer: 'Yasmine Kamel', lastUpdate: '2 Months Ago', status: 'Ready for Pickup' },
];

const statusBadgeStyles: Record<OrderStatus, string> = {
  'New Order': 'bg-red-100 text-red-700',
  'Ready for Pickup': 'bg-green-100 text-green-700',
  'In Production': 'bg-yellow-100 text-yellow-700',
};

const statusDotStyles: Record<OrderStatus, string> = {
  'New Order': 'bg-red-500',
  'Ready for Pickup': 'bg-green-500',
  'In Production': 'bg-yellow-500',
};

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-6">
      <nav className="space-y-4">
        <Link href="/orders" className="flex items-center text-gray-700 hover:text-gray-900">
          <ShoppingBagIcon className="w-5 h-5 mr-2" /> Orders
        </Link>
        <Link href="/products" className="flex items-center text-gray-700 hover:text-gray-900">
          <ClipboardIcon className="w-5 h-5 mr-2" /> My Products
        </Link>
      </nav>
    </div>
  </aside>
);

const WorkerOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Active Orders' | 'Completed Orders'>('Active Orders');

  const displayed = sampleOrders;

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold">Worker’s Orders</h1>
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                <span className="w-2 h-2 mr-2 rounded-full bg-green-500" /> Active
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600">
                <ShareIcon className="w-5 h-5 mr-2" /> Share
              </button>
              <button className="p-2 rounded hover:bg-gray-200">
                <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-300 mb-6">
            {['Active Orders', 'Completed Orders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Active Orders' | 'Completed Orders')}
                className={`px-4 py-2 -mb-px font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200 rounded shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <div className="inline-flex items-center">
                      Orders
                      <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <div className="inline-flex items-center">
                      Last Update
                      <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <div className="inline-flex items-center">
                      Status
                      <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayed.map(({ id, customer, lastUpdate, status }) => (
                  <tr key={id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{lastUpdate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-full ${statusBadgeStyles[status]}`}>
                        <span className={`w-2 h-2 mr-2 rounded-full ${statusDotStyles[status]}`} />
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default WorkerOrdersPage;
