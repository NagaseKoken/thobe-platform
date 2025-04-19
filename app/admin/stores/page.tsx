"use client";

import { useState } from "react";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { StoreFilters } from "@/components/admin/StoreFilters";
import { StoreCard, type Store } from "@/components/admin/StoreCard";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// Enhanced mock data with more details
const stores: Store[] = Array.from({ length: 9 }).map((_, i) => ({
  id: String(i + 1),
  name: `Thobe Store ${i + 1}`,
  location: "Dhahran, Saudi Arabia",
  rating: Math.floor(Math.random() * 5) + 1,
  status: i % 3 === 0 ? "active" : "pending",
  productsCount: Math.floor(Math.random() * 100) + 1,
}));

export default function StoresPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter stores
  const filteredStores = stores.filter(store => {
    const statusMatch = currentFilter === "all" || store.status === currentFilter;
    const searchMatch = searchQuery === "" || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const paged = filteredStores.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-1">
      {/* Toggle Button */}
      <button
        className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static w-64 bg-white h-full transition-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <Sidebar />
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Manage Stores</h1>
            <Button>Add New Store</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Stores</h3>
              <p className="text-2xl font-semibold">{stores.length}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Active Stores</h3>
              <p className="text-2xl font-semibold text-green-600">
                {stores.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Pending Approval</h3>
              <p className="text-2xl font-semibold text-yellow-600">
                {stores.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <StoreFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />

          {/* Store Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
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
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className={page === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
      <Footer />
    </div>
  );
}