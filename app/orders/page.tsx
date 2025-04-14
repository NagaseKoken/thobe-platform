import TopNavbar from "@/components/reusable/TopNavbar";
import PageLayout from "@/components/reusable/PageLayout";
import HeaderSection from "@/components/reusable/HeaderSection";
import TabsOrders from "@/components/orders/TabsOrders";

export default function OrdersPage() {
  return (
    <>
      <TopNavbar />
      <PageLayout>
        <HeaderSection
          title="Viewing Orders"
          actionText="Share"
          titleSuffix={
            <div className="flex items-center gap-2 text-sm font-medium bg-gray-100 text-black px-3 py-1 rounded-full">
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              Active
            </div>
          }
        />

        <TabsOrders />
      </PageLayout>
    </>
  );
}