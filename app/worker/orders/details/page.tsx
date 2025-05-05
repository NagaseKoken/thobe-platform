"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	ArrowLeftIcon,
	UserIcon,
	ShoppingBagIcon,
	ClipboardIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/reusable/navbar";
import Footer from "@/components/reusable/Footer";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/actions/worker-queries";

export type OrderStatus = "In Production" | "Ready for Pickup" | "Picked Up";

function OrderDetailsContent() {
	const params = useSearchParams();
	const id = params.get("id") || "";

	// const [order, setOrder] = useState<OrderDetails | null>(null);
	// const [loading, setLoading] = useState(true);
	const { data: order, isPending: loading } = useQuery({
		queryKey: ["order", id],
		queryFn: () => getOrderById(id),
	});
	const [status, setStatus] = useState<OrderStatus>(
		order?.status ?? "In Production"
	);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="flex flex-col items-center">
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
					<span className="mt-2 text-gray-600">Loading…</span>
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="p-8 text-center">
				<p>Order not found.</p>
				<Link href="/worker/orders" className="text-orange-600 hover:underline">
					← Back to Orders
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
			<Navbar />
			<div className="flex flex-1">
				<aside className="w-64 bg-white border-r p-6">
					<h2 className="text-lg font-semibold mb-6">Dashboard</h2>
					<nav className="space-y-4">
						<Link
							href="/worker"
							className="flex items-center text-gray-700 hover:bg-gray-50 p-2 rounded"
						>
							<UserIcon className="w-5 h-5 mr-2" /> Profile
						</Link>
						<Link
							href="/worker/orders"
							className="flex items-center bg-orange-50 text-orange-600 p-2 rounded"
						>
							<ShoppingBagIcon className="w-5 h-5 mr-2" /> Orders
						</Link>
						<Link
							href="/worker/fabrics-products"
							className="flex items-center text-gray-700 hover:bg-gray-50 p-2 rounded"
						>
							<ClipboardIcon className="w-5 h-5 mr-2" /> Fabrics & Products
						</Link>
					</nav>
				</aside>

				<main className="flex-1 p-8">
					<div className="flex justify-between items-center mb-6">
						<div>
							<Link
								href="/worker/orders"
								className="text-orange-600 hover:underline inline-flex items-center mb-2"
							>
								<ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Orders
							</Link>
							<h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
							<p className="text-sm text-gray-500">
								Created on {new Date(order.createdAt).toLocaleString()}
							</p>
						</div>
						<div>
							<span className="text-sm text-gray-500 mr-2">Status:</span>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value as OrderStatus)}
								className="px-3 py-1 rounded border"
							>
								<option>In Production</option>
								<option>Ready for Pickup</option>
								<option>Picked Up</option>
							</select>
						</div>
					</div>

					<div className="grid gap-6">
						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-lg font-semibold mb-4">
								Customer Information
							</h2>
							<div className="space-y-2">
								<div>
									<span className="font-medium text-gray-600">Email:</span>{" "}
									<span>{order.email}</span>
								</div>
								<div>
									<span className="font-medium text-gray-600">Phone:</span>{" "}
									<span>{order.phone}</span>
								</div>
								<div>
									<span className="font-medium text-gray-600">Total:</span>{" "}
									<span>${order.total.toFixed(2)}</span>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-lg font-semibold mb-4">Order Notes</h2>
							<p>{order.notes}</p>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default function OrderDetailsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<OrderDetailsContent />
		</Suspense>
	);
}
