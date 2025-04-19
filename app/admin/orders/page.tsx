"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {Navbar} from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { StatCard } from "@/components/admin/StatCard";
import { OrderFilters } from "@/components/admin/OrderFilters";
import { OrdersTable, Order } from "@/components/admin/OrdersTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { OrderDetailDrawer } from "@/components/admin/OrderDetailDrawer";

// mock data with more entries
const ordersMock: Order[] = [
  { id: "24521", date: "2025-04-18", customer: "Mohammed Ali", total: "$120.00", status: "Shipped" },
  { id: "24522", date: "2025-04-19", customer: "Yasmine Kamel", total: "$80.00", status: "Pending" },
  // ...existing mock data...
];

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(""); 

  // Filter orders based on status and search
  const filteredOrders = ordersMock.filter(order => {
    const statusMatch = currentFilter === "all" || 
      order.status.toLowerCase() === currentFilter.toLowerCase();
    const searchMatch = searchQuery === "" || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paged = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Orders" value={ordersMock.length} />
            <StatCard 
              title="Pending" 
              value={ordersMock.filter(o => o.status === "Pending").length} 
              variant="secondary" 
            />
            <StatCard 
              title="Shipped" 
              value={ordersMock.filter(o => o.status === "Shipped").length} 
              variant="secondary" 
            />
            <StatCard 
              title="Delivered" 
              value={ordersMock.filter(o => o.status === "Delivered").length} 
              variant="success" 
            />
          </div>

          {/* Filters */}
          <OrderFilters 
            onFilterChange={handleFilterChange} 
            currentFilter={currentFilter}
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setPage(1);
            }}
          />

          {/* Table */}
          <OrdersTable 
            items={paged} 
            onView={setOpenOrder}
          />

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

          {/* Detail Drawer */}
          {openOrder && (
            <OrderDetailDrawer 
              orderId={openOrder} 
              open={!!openOrder} 
              onClose={() => setOpenOrder(null)} 
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}