"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/reusable/navbar";

import PageLayout from "@/components/reusable/PageLayout";
import HeaderSection from "@/components/reusable/HeaderSection";
import OrderFooter from "@/components/reusable/Footer";
import TabsOrders from "@/components/orders/TabsOrders";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");

  useEffect(() => {
    if (refresh) {
      // ✅ Do something useful here
      console.log("Orders page was intentionally revisited — refresh=true");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Or trigger any state reset, reload logic, etc.
      // Example: reset filters or refetch data from a client API
    }
  }, [refresh]);

  return (
    <>
      <Navbar />

      <PageLayout>
        <HeaderSection
          title="Viewing Orders"
          titleSuffix={
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button className="bg-gray-600 hover:bg-red-500 text-white">
                  Share
                </Button>
                <Button variant="ghost" size="icon" aria-label="More options">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          }
        />

        <main>
          <TabsOrders />
        </main>
      </PageLayout>

      <OrderFooter />
    </>
  );
}
