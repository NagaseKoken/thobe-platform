"use client";

import { useEffect, useState } from "react";
import OrderTable, { Order } from "./OrderTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { PackageSearch, PackageCheck } from "lucide-react";

export default function TabsOrders() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  // Normalize any status string to match the expected type
  function normalizeStatus(status: string): Order["status"] {
    const s = status.toLowerCase();

    if (s.includes("new")) return "New Order";
    if (s.includes("production")) return "In Production";
    if (s.includes("pickup")) return "Ready for Pickup";
    if (s.includes("completed")) return "Completed";

    return "New Order"; // fallback
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) {
          console.error("Failed to fetch orders:", await res.text());
          setActiveOrders([]);
          setCompletedOrders([]);
          return;
        }

        const rawOrders: { name: string; updated: string; status: string }[] = await res.json();

        const formatDate = (iso: string) =>
          new Date(iso).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

        const formattedOrders: Order[] = rawOrders.map((o) => ({
          name: o.name,
          updated: formatDate(o.updated),
          status: normalizeStatus(o.status),
        }));

        setActiveOrders(formattedOrders.filter((o) => o.status !== "Completed"));
        setCompletedOrders(formattedOrders.filter((o) => o.status === "Completed"));
      } catch (err) {
        console.error("Unexpected error fetching orders:", err);
        setActiveOrders([]);
        setCompletedOrders([]);
      }
    }

    fetchOrders();
  }, []);

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList>
        <TabsTrigger value="active">
          <PackageSearch className="w-4 h-4" />
          Active Orders
        </TabsTrigger>
        <TabsTrigger value="completed">
          <PackageCheck className="w-4 h-4" />
          Completed Orders
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <OrderTable orders={activeOrders} />
      </TabsContent>
      <TabsContent value="completed">
        <OrderTable orders={completedOrders} />
      </TabsContent>
    </Tabs>
  );
}