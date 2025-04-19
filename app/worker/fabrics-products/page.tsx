"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import { ShoppingBagIcon, ClipboardIcon, UserIcon } from '@heroicons/react/24/outline';
import { Navbar } from '@/components/reusable/navbar';
import Footer from '@/components/reusable/Footer';


type Fabric = {
  id: number;
  name: string;
  available: boolean;
};

type Product = {
  id: number;
  name: string;
  available: boolean;
};

type Filter = 'all' | 'available' | 'unavailable';

const initialFabrics: Fabric[] = [
  { id: 1, name: 'Fabric 1', available: false },
  { id: 2, name: 'Fabric 2', available: true },
  { id: 3, name: 'Fabric 3', available: false },
  { id: 4, name: 'Fabric 4', available: true },
  { id: 5, name: 'Fabric 5', available: false },
  { id: 6, name: 'Fabric 6', available: true },
];

const initialProducts: Product[] = [
  { id: 1, name: 'Kuwaiti Thobe', available: true },
  { id: 2, name: 'Hijazi Thobe', available: false },
  { id: 3, name: 'Omani Thobe', available: true },
  { id: 4, name: 'Qatari Thobe', available: false },
  { id: 5, name: 'Saudi Thobe', available: true },
  { id: 6, name: 'Emirati Thobe', available: true },
];
const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h2>
      <nav className="space-y-4">

assName="w-5 h-5 mr-3" />

<Link href="/worker" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
  <UserIcon className="w-5 h-5 mr-3" />
  Profile
</Link>

        <Link
          href="/worker/orders"
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
        >
          <ShoppingBagIcon className="w-5 h-5 mr-3" /> Orders
        </Link>
        <Link
          href="/worker/fabrics-products"
          className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium"

        >
          <ClipboardIcon className="w-5 h-5 mr-3" /> Fabrics & Products
        </Link>
      </nav>
    </div>
  </aside>
);

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Fabrics' | 'Products'>('Fabrics');
  const [fabrics, setFabrics] = useState<Fabric[]>(initialFabrics);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<Filter>('all');

  const updateAvailability = (id: number, isAvailable: boolean) => {
    if (activeTab === 'Fabrics') {
      setFabrics(fabrics.map(f => (f.id === id ? { ...f, available: isAvailable } : f)));
    } else {
      setProducts(products.map(p => (p.id === id ? { ...p, available: isAvailable } : p)));
    }
  };

  const items = activeTab === 'Fabrics' ? fabrics : products;
  const displayedItems = items.filter(item =>
    filter === 'all'
      ? true
      : filter === 'available'
      ? item.available
      : !item.available
  );

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 text-gray-900">
      <Navbar customer />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Fabrics & Products</h1>

          <div className="flex items-center justify-between border-b border-gray-300 mb-6">
            <div className="flex">
              {(['Fabrics', 'Products'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setFilter('all');
                  }}
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
            <div className="flex items-center space-x-2">
              <label htmlFor="filter" className="text-gray-700">Show:</label>
              <select
                id="filter"
                value={filter}
                onChange={e => setFilter(e.target.value as Filter)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <p className="text-gray-600">No {activeTab.toLowerCase()} found.</p>
          ) : (
            <div className="space-y-4">
              {displayedItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 rounded shadow-sm"
                >
                  <span className="text-gray-800">{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          item.available ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <select
                      value={item.available ? 'available' : 'unavailable'}
                      onChange={e =>
                        updateAvailability(item.id, e.target.value === 'available')
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;