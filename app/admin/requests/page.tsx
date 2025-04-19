import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { RequestsTable, Request } from "@/components/admin/RequestTable";

const mockData: Request[] = [
  { id: "1", storeOwner: "Mohammed Al Naser",    requestType: "New Product",     status: "Pending"  },
  { id: "2", storeOwner: "Ali AlBugeaey",        requestType: "Discount Approval",status: "Rejected" },
  { id: "3", storeOwner: "Moammal Almahfoudh",   requestType: "Product Update",   status: "Approved" },
  { id: "4", storeOwner: "Reda Alali",           requestType: "New Product",      status: "Pending"  },
];

export default function RequestsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4">Manage Requests</h1>
          <RequestsTable items={mockData} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
