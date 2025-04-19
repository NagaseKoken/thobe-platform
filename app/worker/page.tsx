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
        <Link href="/worker" className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium">
          <UserIcon className="w-5 h-5 mr-3" />
          Profile
        </Link>

        <Link href="/worker/orders" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <ShoppingBagIcon className="w-5 h-5 mr-3" /> Orders
        </Link>
        <Link href="/worker/fabrics-products" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <ClipboardIcon className="w-5 h-5 mr-3" /> Fabrics & Products
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
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <button
              onClick={handleEditToggle}
              className={`inline-flex items-center px-4 py-2 rounded-md font-medium ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              {isEditing ? ( <>Save Changes</> ) : (
                <>
                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
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
