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

// mock data
const ordersMock: Order[] = [
  { id: "24521", date: "2025-04-18", customer: "Mohammed Ali", total: "$120.00", status: "Shipped" },
  { id: "24522", date: "2025-04-19", customer: "Yasmine Kamel", total: "$80.00",  status: "Pending" },
  { id: "24523", date: "2025-04-17", customer: "Ahmed Mohammed", total: "$200.00", status: "Delivered" },
];

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  const paged = ordersMock; // replace with real pagination logic

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Orders" value={ordersMock.length} />
            <StatCard title="Pending" value={ordersMock.filter(o => o.status === "Pending").length} variant="secondary" />
            <StatCard title="Shipped" value={ordersMock.filter(o => o.status === "Shipped").length} variant="secondary" />
            <StatCard title="Delivered" value={ordersMock.filter(o => o.status === "Delivered").length} variant="success" />
          </div>
          {/* Filters */}
          <OrderFilters />
          {/* Table */}
          <OrdersTable items={paged} onView={setOpenOrder} />
          {/* Pagination UI */}
          <Pagination>
            <PaginationPrevious onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} />
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
            <PaginationNext onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} />
          </Pagination>
          {/* Detail Drawer */}
          {openOrder && (
            <OrderDetailDrawer orderId={openOrder} open={!!openOrder} onClose={() => setOpenOrder(null)} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
