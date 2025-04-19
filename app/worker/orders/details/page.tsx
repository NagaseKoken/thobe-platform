"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShoppingBagIcon,
  ClipboardIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Navbar from "@/components/reusable/navbar";

import Footer from "@/components/reusable/Footer";

import { sampleOrders, OrderStatus, Order } from "../page";

interface OrderDetails extends Order {
  email: string;
  phone: string;
  orderNumber: string;
  createdAt: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  notes: string;
}

const ordersData: OrderDetails[] = sampleOrders.map(o => ({
  ...o,
  email: `${o.customer.toLowerCase().replace(/ /g, ".")}@thobemarket.com`,
  phone: "+966 50 123 4567",
  orderNumber: `ORD-2025-00${o.id}`,
  createdAt: "April 15, 2025",
  items: [
    { id: o.id * 10 + 1, name: "Classic White Thobe",      quantity: 1, price: 120, image: "/thobe-white.jpg"   },
    { id: o.id * 10 + 2, name: "Embroidered Beige Thobe", quantity: 1, price: 150, image: "/thobe-beige.jpg" },
  ],
  notes: `Order #${o.id}: premium stitching and precise sizing required.`,
}));

const statusBadgeStyles: Record<OrderStatus, string> = {
  "In Production":    "bg-blue-100 text-blue-700",
  "Ready for Pickup": "bg-green-100 text-green-700",
  "Picked Up":        "bg-gray-100 text-gray-700",
};

export default function OrderDetailsPage() {
  const params  = useSearchParams();
  const idParam = params.get("id");
  const id      = idParam ? parseInt(idParam, 10) : null;

  const order = ordersData.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 p-8 text-center text-gray-700">
          <p>Order not found.</p>
          <Link href="/worker/orders" className="mt-4 inline-block text-orange-600 hover:underline">
            ← Back to Orders
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const [status, setStatus] = useState<OrderStatus>(order.status);
  const subtotal = order.items.reduce((sum, itm) => sum + itm.price * itm.quantity, 0);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setStatus(newStatus);
    console.log(`Order ${order.id} status updated to: ${newStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h2>
            <nav className="space-y-4">
            <Link
  href="/worker"
  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
>
  <UserIcon className="w-5 h-5 mr-3" />
  Profile
</Link>
              <Link href="/worker/orders" className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium">
                <ShoppingBagIcon className="w-5 h-5 mr-3" /> Orders
              </Link>
              <Link href="/worker/fabrics-products" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                <ClipboardIcon className="w-5 h-5 mr-3" /> Fabrics & Products
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <Link href="/worker/orders" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-2">
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Orders
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h1>
              <p className="text-sm text-gray-500">Created on {order.createdAt}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <select
                value={status}
                onChange={e => handleStatusChange(e.target.value as OrderStatus)}
                className={`inline-flex items-center px-3 py-2 rounded-md ${statusBadgeStyles[status]} focus:outline-none`}
              >
                {(["In Production","Ready for Pickup","Picked Up"] as OrderStatus[]).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-700">Subtotal</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-700">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>  
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Notes</h2>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-gray-800">{order.customer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-800">{order.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-gray-800">{order.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
=======
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
}
};

export default OrderDetailPage;
