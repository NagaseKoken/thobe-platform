"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/reusable/navbar';
import Footer from '@/components/reusable/Footer';

type OrderStatus = 'New Order' | 'In Production';

interface CustomerInfo {
  name: string;
  location: string;
  contact: string;
}

interface OrderDetailsInfo {
  type: string;
  fabric: string;
  features: string[];
}

interface OrderDetail {
  id: number;
  status: OrderStatus;
  customer: CustomerInfo;
  details: OrderDetailsInfo;
  decision?: 'accepted' | 'rejected';
}

 const sampleOrder: OrderDetail = {
  id: 1,
  status: 'New Order',
  customer: { name: 'M', location: 'M', contact: 'M' },
  details: { type: 'Tailor New Thobe', fabric: 'Fabric 1', features: ['Features 1', 'Features 2'] },
};

const statusBadgeStyles: Record<OrderStatus, string> = {
  'New Order': 'bg-red-100 text-red-700',
  'In Production': 'bg-yellow-100 text-yellow-700',
};
const statusDotStyles: Record<OrderStatus, string> = {
  'New Order': 'bg-red-500',
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

const OrderDetailPage: React.FC = () => {
  const [order, setOrder] = useState<OrderDetail>(sampleOrder);

  const handleDecision = (decision: 'accepted' | 'rejected') => {
    setOrder({ ...order, decision });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold">Order {order.id}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full ${statusBadgeStyles[order.status]}`}>
                <span className={`w-2 h-2 mr-2 rounded-full ${statusDotStyles[order.status]}`} />
                {order.status}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {order.decision ? (
                <span className={`px-6 py-2 font-medium rounded-full text-white ${
                  order.decision === 'accepted' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {order.decision === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              ) : (
                <> 
                  <button
                    onClick={() => handleDecision('accepted')}
                    className="px-6 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision('rejected')}
                    className="px-6 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Customer Details:</h2>
            <div className="grid grid-cols-3 gap-8 text-gray-700">
              <div><span className="font-medium">Name:</span> {order.customer.name}</div>
              <div><span className="font-medium">Location:</span> {order.customer.location}</div>
              <div><span className="font-medium">Contact:</span> {order.customer.contact}</div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Details:</h2>
            <div className="grid grid-cols-3 gap-8 text-gray-700">
              <div>
                <span className="font-medium">Type:</span>
                <div>{order.details.type}</div>
              </div>
              <div>
                <span className="font-medium">Fabric:</span>
                <div>{order.details.fabric}</div>
              </div>
              <div>
                <span className="font-medium">Features:</span>
                <ul className="list-disc list-inside">
                  {order.details.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
