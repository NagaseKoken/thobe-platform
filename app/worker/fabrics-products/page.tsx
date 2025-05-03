"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/reusable/Navbar';
import Footer from '@/components/reusable/Footer';
import { Clipboard, ShoppingBag, User } from 'lucide-react';

type Fabric = { id: string; name: string; available: boolean };
type Product = { id: string; name: string; available: boolean };

type Tab = 'Fabrics' | 'Products';
type Filter = 'all' | 'available' | 'unavailable';

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/worker" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <User className="w-5 h-5 mr-3" />
          Profile
        </Link>
        <Link href="/worker/orders" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <ShoppingBag className="w-5 h-5 mr-3" /> Orders
        </Link>
        <Link href="/worker/fabrics-products" className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium">
          <Clipboard className="w-5 h-5 mr-3" /> Fabrics & Products
        </Link>
      </nav>
    </div>
  </aside>
);

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Fabrics');
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/worker/fabrics-products')
      .then(res => res.json())
      .then((data: { fabrics: Fabric[]; products: Product[] }) => {
        setFabrics(data.fabrics);
        setProducts(data.products);
      })
      .catch(err => console.error('Failed to load items:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const updateAvailability = async (id: string, isAvailable: boolean) => {
    if (activeTab === 'Fabrics') {
      setFabrics(prev => prev.map(f => f.id === id ? { ...f, available: isAvailable } : f));
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, available: isAvailable } : p));
    }

    try {
      await fetch('/api/worker/fabrics-products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, available: isAvailable }),
      });
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  const items = activeTab === 'Fabrics' ? fabrics : products;
  const displayedItems = items.filter(item =>
    filter === 'all' ? true : filter === 'available' ? item.available : !item.available
  );

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="flex justify-center items-center h-64">
              <svg
                className="animate-spin h-8 w-8 text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span className="ml-2 text-gray-600">Loading…</span>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Fabrics & Products</h1>

          <div className="flex items-center justify-between border-b border-gray-300 mb-6">
            <div className="flex">
              {( ['Fabrics', 'Products'] as Tab[] ).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setFilter('all'); }}
                  className={`px-4 py-2 -mb-px font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}>
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
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No {activeTab.toLowerCase()} found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedItems.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                  <span className="text-gray-800">{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}/>
                      <span className="text-sm text-gray-600">{item.available ? 'Available' : 'Unavailable'}</span>
                    </div>
                    <select
                      value={item.available ? 'available' : 'unavailable'}
                      onChange={e => updateAvailability(item.id, e.target.value === 'available')}
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
