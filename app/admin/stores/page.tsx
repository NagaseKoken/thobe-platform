import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";

import { StoreFilters } from "@/components/admin/StoreFilters";
import { StoreCard, type Store } from "@/components/admin/StoreCard";
import { Pagination } from "@/components/ui/pagination";

// mock data — swap this out for a real fetch later
const stores: Store[] = Array.from({ length: 9 }).map((_, i) => ({
  id: String(i + 1),
  name: `Thobe Store ${i + 1}`,
  location: "Located in City Saudi Arabia Dharan",
}));

export default function StoresPage() {
  const currentPage = 1;
  const totalPages = 5;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <StoreFilters />

          <div>
            {stores.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
