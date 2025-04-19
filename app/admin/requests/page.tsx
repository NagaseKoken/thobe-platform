"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {Navbar} from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { RequestsTable, Request } from "@/components/admin/RequestTable";
import { StatCard } from "@/components/admin/StatCard";
import { RequestFilters } from "@/components/admin/RequestFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const mockData: Request[] = [
  { id: "1", storeOwner: "Mohammed Al Naser", requestType: "New Product", status: "Pending" },
  { id: "2", storeOwner: "Ali AlBugeaey", requestType: "Discount Approval", status: "Rejected" },
  { id: "3", storeOwner: "Moammal Almahfoudh", requestType: "Product Update", status: "Approved" },
  { id: "4", storeOwner: "Reda Alali", requestType: "New Product", status: "Pending" },
  { id: "5", storeOwner: "Hassan Ahmed", requestType: "Discount Approval", status: "Pending" },
  { id: "6", storeOwner: "Fatima Ali", requestType: "Product Update", status: "Approved" },
  { id: "7", storeOwner: "Omar Khalid", requestType: "New Product", status: "Rejected" },
  { id: "8", storeOwner: "Sarah Mohammad", requestType: "Discount Approval", status: "Pending" },
];

export default function RequestsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter requests based on status and search
  const filteredRequests = mockData
    .filter(request => {
      const statusMatch = currentFilter === "all" ||
        request.status.toLowerCase() === currentFilter.toLowerCase();
      const searchMatch = searchQuery === "" ||
        request.storeOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paged = filteredRequests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Toggle Button */}
        <button
          className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden z-50"
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
            <h1 className="text-3xl font-bold tracking-tight">Requests</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Requests" value={mockData.length} />
            <StatCard
              title="Pending"
              value={mockData.filter(r => r.status === "Pending").length}
              variant="secondary"
            />
            <StatCard
              title="Approved"
              value={mockData.filter(r => r.status === "Approved").length}
              variant="success"
            />
            <StatCard
              title="Rejected"
              value={mockData.filter(r => r.status === "Rejected").length}
              variant="destructive"
            />
          </div>

          {/* Filters */}
          <RequestFilters
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter}
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setPage(1);
            }}
          />

          {/* Table */}
          <RequestsTable items={paged} />

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(p => Math.max(p - 1, 1))}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
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