"use client";
import { useState } from "react";
import Navbar from "@/components/reusable/navbar";
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
  { id: "24523", date: "2025-04-17", customer: "Ahmed Mohammed", total: "$200.00", status: "Delivered" },
  { id: "24524", date: "2025-04-16", customer: "Sara Ahmad", total: "$150.00", status: "Pending" },
  { id: "24525", date: "2025-04-15", customer: "Omar Hassan", total: "$90.00", status: "Shipped" },
  { id: "24526", date: "2025-04-14", customer: "Fatima Ali", total: "$175.00", status: "Delivered" },
  { id: "24527", date: "2025-04-13", customer: "Khalid Nasser", total: "$220.00", status: "Pending" },
  { id: "24528", date: "2025-04-12", customer: "Layla Mohammed", total: "$95.00", status: "Shipped" },
  { id: "24529", date: "2025-04-11", customer: "Hassan Ibrahim", total: "$130.00", status: "Delivered" },
  { id: "24530", date: "2025-04-10", customer: "Noor Sami", total: "$185.00", status: "Pending" },
  { id: "24531", date: "2025-04-09", customer: "Ali Mahmoud", total: "$160.00", status: "Shipped" },
  { id: "24532", date: "2025-04-08", customer: "Aisha Omar", total: "$140.00", status: "Delivered" }
];

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(""); 
  // Filter orders based on status
  const filteredOrders = ordersMock
    .filter(order => {
      // First apply status filter
      const statusMatch = currentFilter === "all" || 
        order.status.toLowerCase() === currentFilter.toLowerCase();
      
      // Then apply search filter
      const searchMatch = searchQuery === "" || 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    });
  // Calculate total pages based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Get paginated data
  const paged = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
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
              setPage(1); // Reset to first page when search changes
            }}
          />
          {/* Table */}
          <OrdersTable 
            items={paged} 
            onView={setOpenOrder}
          />

          {/* Pagination UI */}
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