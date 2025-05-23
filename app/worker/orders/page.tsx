"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
	ShoppingBagIcon,
	ClipboardIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/reusable/navbar";
import Footer from "@/components/reusable/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/actions/worker-queries";
import { queryClient } from "@/components/reusable/provider";
import { toast } from "sonner";

export type OrderStatus = "In Production" | "Ready for Pickup" | "Picked Up";

export interface Order {
	id: string;
	customer: string;
	lastUpdate: string;
	status: OrderStatus;
}

const statusBadgeStyles: Record<OrderStatus, string> = {
	"In Production": "bg-blue-100 text-blue-700",
	"Ready for Pickup": "bg-green-100 text-green-700",
	"Picked Up": "bg-gray-100 text-gray-700",
};

const Sidebar: React.FC = () => (
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
				<Link
					href="/worker/orders"
					className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium"
				>
					<ShoppingBagIcon className="w-5 h-5 mr-3" /> Orders
				</Link>
				<Link
					href="/worker/fabrics-products"
					className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
				>
					<ClipboardIcon className="w-5 h-5 mr-3" /> Fabrics & Products
				</Link>
			</nav>
		</div>
	</aside>
);

const WorkerOrdersPage: React.FC = () => {
	// const [orders, setOrders] = useState<Order[]>([]);
	const [activeTab, setActiveTab] = useState<OrderStatus>("In Production");
	const [searchText, setSearchText] = useState("");
	// const [loading, setLoading] = useState(true);
	const { data: orders, isPending: loading } = useQuery({
		queryKey: ["ordersWorker"],
		queryFn: getOrders,
	});

	// useEffect(() => {
	//   setLoading(true);
	//   fetch("/api/worker/orders")
	//     .then(res => res.json())
	//     .then((data: Order[]) => {
	//       setOrders(data);
	//       setLoading(false);
	//     })
	//     .catch(err => {
	//       console.error("Failed to load orders:", err);
	//       setLoading(false);
	//     });
	// }, []);
	const { mutate } = useMutation({
		mutationKey: ["update-availability"],
		mutationFn: updateOrderStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products-worker"] });
			toast.success("Updated availability successfully");
		},
		onError: (err) => {
			console.error(err);
			toast.error("Failed to update availability");
		},
	});
	// const updateStatus = async (id: string, status: OrderStatus) => {
	// 	setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
	// 	try {
	// 		const res = await fetch("/api/worker/orders", {
	// 			method: "PUT",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify({ id, status }),
	// 		});
	// 		if (!res.ok) throw new Error(await res.text());
	// 	} catch (err) {
	// 		console.error("Failed to update status:", err);
	// 	}
	// };

	const filtered = useMemo(() => {
		return orders
			?.filter((o) => o.status === activeTab)
			.filter((o) =>
				o.customer.toLowerCase().includes(searchText.toLowerCase())
			);
	}, [orders, activeTab, searchText]);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar />

				<main className="flex-1 p-8">
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-800">Orders</h1>
						<p className="mt-1 text-sm text-gray-500">
							Manage and track all your customer orders
						</p>
					</div>

					<div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div className="flex border-b border-gray-200">
							{(
								[
									"In Production",
									"Ready for Pickup",
									"Picked Up",
								] as OrderStatus[]
							).map((status) => (
								<button
									key={status}
									onClick={() => setActiveTab(status)}
									className={`px-4 py-2 -mb-px font-medium ${
										activeTab === status
											? "border-b-2 border-orange-500 text-orange-600"
											: "text-gray-600 hover:text-gray-800"
									}`}
								>
									{status}
								</button>
							))}
						</div>
						<div className="relative w-full sm:w-64">
							<MagnifyingGlassIcon className="absolute w-4 h-4 text-gray-400 left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
							<input
								type="text"
								className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
								placeholder="Search orders..."
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
					</div>

					<div className="mb-6 flex flex-wrap gap-4">
						<span className="text-sm text-gray-500">Status:</span>
						{Object.entries(statusBadgeStyles).map(([status, style]) => (
							<div key={status} className="flex items-center text-sm">
								<span className={`${style} w-2 h-2 mr-2 rounded-full`} />
								<span>{status}</span>
							</div>
						))}
					</div>

					{loading ? (
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
					) : !!filtered?.length ? (
						<div className="bg-white rounded-lg shadow-sm overflow-hidden">
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Customer
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Last Update
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{filtered.map(({ id, customer, lastUpdate, status }) => (
											<tr key={id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="font-medium text-gray-800">
														{customer}
													</div>
													<div className="text-sm text-gray-500">
														Order #{id}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
													{lastUpdate}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<select
														className={`px-2.5 py-1 rounded-full text-xs font-medium focus:outline-none ${statusBadgeStyles[status as OrderStatus]}`}
														value={status}
														onChange={(e) =>
															mutate({
																id,
																status: e.target.value as OrderStatus,
															})
														}
													>
														<option value="In Production">In Production</option>
														<option value="Ready for Pickup">
															Ready for Pickup
														</option>
														<option value="Picked Up">Picked Up</option>
													</select>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													<Link
														href={`/worker/orders/details?id=${id}`}
														className="text-orange-600 hover:text-orange-800 font-medium"
													>
														View Details
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<div className="bg-white p-8 rounded-lg shadow-sm text-center">
							<p className="text-gray-500">
								No orders found. Try adjusting your search.
							</p>
						</div>
					)}
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default WorkerOrdersPage;
