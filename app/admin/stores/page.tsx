"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { StoreFilters } from "@/components/admin/StoreFilters";
import { StoreCard } from "@/components/admin/StoreCard";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { AddStoreModal } from "@/components/admin/AddStoreModal";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createStores, getAllStores } from "@/actions/store-actions";
import { queryClient } from "@/components/reusable/provider";
import { toast } from "sonner";

export default function StoresPage() {
	const [page, setPage] = useState(1);
	const itemsPerPage = 6;
	const [searchQuery, setSearchQuery] = useState("");
	const [currentFilter, setCurrentFilter] = useState<
		"all" | "active" | "Inactive"
	>("all");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	// const [stores, setStores] = useState<Store[]>([]);

	const { data: stores, isPending: isLoading } = useQuery({
		queryKey: ["stores"],
		queryFn: getAllStores,
	});
	// 1. Fetch real stores from the API on mount
	// useEffect(() => {
	//   fetch("/api/stores")
	//     .then(res => {
	//       if (!res.ok) throw new Error("Failed to fetch stores");
	//       return res.json();
	//     })
	//     .then((data: Store[]) => setStores(data))
	//     .catch(console.error);
	// }, []);

	const { mutate } = useMutation({
		mutationKey: ["create-store"],
		mutationFn: createStores,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stores"] });
			toast.success("Store created successfully!");
		},
		onError: (err) => {
			console.error(err);
			toast.error("Failed to create store");
		},
	});

	// 2. When AddStoreModal calls onSubmit, POST to /api/stores
	const handleAddStore = async (newStore: {
		name: string;
		location: string;
		ownerId: string;
		status: boolean;
		rating: number;
		image: string; // Add this line
	}) => {
		try {
			await mutate({ data: { ...newStore, created_at: new Date() } });
		} catch (err) {
			console.error("Add store failed:", err);
		}
	};

	// Filter & paginate
	const filtered = useMemo(() => {
		if (!stores) {
			return [];
		}

		return stores.filter((s) => {
			let statusOK = true;
			if (currentFilter === "active") {
				statusOK = s.status === true;
			} else if (currentFilter === "Inactive") {
				statusOK = s.status === false;
			}
			const textOK =
				!searchQuery ||
				s.name.toLowerCase().includes(searchQuery.toLowerCase());
			return statusOK && textOK;
		});
	}, [stores, currentFilter, searchQuery]);

	const totalPages = useMemo(() => {
		return Math.ceil(filtered.length / itemsPerPage);
	}, [filtered, itemsPerPage]);

	const paged = useMemo(() => {
		return filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	}, [filtered, page, itemsPerPage]);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-1">
				{/* sidebar toggle for mobile */}
				<button
					className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
					onClick={() => setSidebarOpen((x) => !x)}
				>
					<Menu className="w-6 h-6" />
				</button>
				<aside
					className={`fixed md:static w-64 bg-white h-full transition-transform
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
				>
					<Sidebar />
				</aside>
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-black/50 md:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				<main className="flex-1 p-6 space-y-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold">Manage Stores</h1>
						<Button onClick={() => setIsAddModalOpen(true)}>
							<Plus className="w-4 h-4 mr-2" />
							Add Store
						</Button>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<DashboardCard title="Total Stores" value={stores?.length ?? 0} />
						<DashboardCard
							title="Active Stores"
							value={stores?.filter((s) => s.status === true).length ?? 0}
						/>
						<DashboardCard
							title="Inactive Approval"
							value={stores?.filter((s) => s.status === false).length ?? 0}
						/>
					</div>

					<StoreFilters
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						currentFilter={currentFilter}
						onFilterChange={(filter: string) =>
							setCurrentFilter(filter as "all" | "active" | "Inactive")
						}
					/>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{paged.map((store) => (
							<StoreCard key={store.id} store={store} />
						))}
					</div>

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									className={page === 1 ? "opacity-50 pointer-events-none" : ""}
								/>
							</PaginationItem>

							{Array.from({ length: totalPages }).map((_, i) => (
								<PaginationItem key={i}>
									<PaginationLink
										isActive={page === i + 1}
										onClick={() => setPage(i + 1)}
									>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									className={
										page === totalPages ? "opacity-50 pointer-events-none" : ""
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>

					<AddStoreModal
						open={isAddModalOpen}
						onClose={() => setIsAddModalOpen(false)}
						onSubmit={handleAddStore}
					/>
				</main>
			</div>
			<Footer />
		</div>
	);
}

function DashboardCard({ title, value }: { title: string; value: number }) {
	return (
		<div className="p-4 bg-white rounded-lg shadow">
			<h3 className="text-sm font-medium text-gray-500">{title}</h3>
			<p className="text-2xl font-semibold">{value}</p>
		</div>
	);
}
