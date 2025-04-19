"use client";

import OrderTable, { Order } from "@/components/orders/OrderTable";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { PackageSearch, PackageCheck } from "lucide-react";

const activeOrders: Order[] = [
  { name: "Mohammed Al Naser", updated: "5 Min Ago", status: "New Order" },
  { name: "Ali AlBugeeay", updated: "Yesterday", status: "Ready for Pickup" },
  { name: "Moammal Almahfoudh", updated: "2 Days Ago", status: "In Production" },
];

const completedOrders: Order[] = [
  { name: "Salim AlDossari", updated: "2 Weeks Ago", status: "Completed" },
  { name: "Mona AlShehri", updated: "3 Weeks Ago", status: "Completed" },
];

export default function TabsOrders() {
  return (
    <Tabs defaultValue="active" className="w-full">
      {/* Tab Triggers */}
      <TabsList
        aria-label="Order Tabs"
        className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-white p-2 rounded-lg shadow mb-4"
      >
        <TabsTrigger
          value="active"
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md
            data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-black
            data-[state=active]:shadow-sm
            hover:bg-green-300 transition"
        >
          <PackageSearch className="w-4 h-4" />
          Active Orders
        </TabsTrigger>

        <TabsTrigger
          value="completed"
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md
            data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-black
            data-[state=active]:shadow-sm
            hover:bg-red-300 transition"
        >
          <PackageCheck className="w-4 h-4" />
          Completed Orders
        </TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="active">
        <OrderTable orders={activeOrders} />
      </TabsContent>

      <TabsContent value="completed">
        <OrderTable orders={completedOrders} />
      </TabsContent>
    </Tabs>
  );
}