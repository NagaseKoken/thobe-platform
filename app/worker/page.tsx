"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/reusable/navbar';
import Footer from '@/components/reusable/Footer';

type Fabric = {
  id: number;
  name: string;
  available: boolean;
};

const fabrics: Fabric[] = [
  { id: 1, name: 'Fabric 1', available: false },
  { id: 2, name: 'Fabric 2', available: true },
  { id: 3, name: 'Fabric 3', available: false },
  { id: 4, name: 'Fabric 4', available: true },
  { id: 5, name: 'Fabric 5', available: false },
  { id: 6, name: 'Fabric 6', available: true },
];

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-6">
      <nav className="space-y-4">
        <Link href="/orders" className="flex items-center text-gray-700 hover:text-gray-900">
          <ShoppingBagIcon className="w-5 h-5 mr-2" />
          Orders
        </Link>
        <Link href="/products" className="flex items-center text-gray-700 hover:text-gray-900">
          <ClipboardIcon className="w-5 h-5 mr-2" />
          My Products
        </Link>
      </nav>
    </div>
  </aside>
);

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Fabrics' | 'Products'>('Fabrics');

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 text-gray-900">
      <Navbar customer />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">My Products</h1>

          <div className="flex border-b border-gray-300 mb-6">
            {['Fabrics', 'Products'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Fabrics' | 'Products')}
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

          {activeTab === 'Fabrics' && (
            <div className="space-y-4">
              {fabrics.map(({ id, name, available }) => (
                <div
                  key={id}
                  className="flex justify-between items-center bg-white p-4 rounded shadow-sm"
                >
                  <span className="text-gray-800">{name}</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        available ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm text-gray-600">
                      {available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Products' && (
            <div className="text-gray-600">No products available yet.</div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
