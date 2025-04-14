"use client";

import OrderTable from "@/components/orders/OrderTable";
import CompletedOrderTable from "@/components/orders/CompletedOrderTable"; // ✅ NEW import

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { PackageSearch, PackageCheck } from "lucide-react";

export default function TabsOrders() {
  return (
    <Tabs defaultValue="active" className="w-full">
      {/* Tab Buttons */}
      <TabsList className="bg-transparent border-b border-gray-200 px-0 mb-4">
        <TabsTrigger
          value="active"
          className="flex items-center gap-2 text-sm font-medium border-b-2 border-transparent rounded-none px-4 py-2
                     data-[state=active]:border-black data-[state=active]:text-black
                     hover:text-red-600 hover:border-red-600 transition"
        >
          <PackageSearch className="w-4 h-4" />
          Active Orders
        </TabsTrigger>

        <TabsTrigger
          value="completed"
          className="flex items-center gap-2 text-sm font-medium border-b-2 border-transparent rounded-none px-4 py-2
                     data-[state=active]:border-black data-[state=active]:text-black
                     hover:text-green-600 hover:border-green-600 transition"
        >
          <PackageCheck className="w-4 h-4" />
          Completed Orders
        </TabsTrigger>
      </TabsList>

      {/* Tab Panels */}
      <TabsContent value="active">
        <OrderTable />
      </TabsContent>

      <TabsContent value="completed">
        <CompletedOrderTable /> {/* ✅ Replaces the placeholder */}
      </TabsContent>
    </Tabs>
  );
}