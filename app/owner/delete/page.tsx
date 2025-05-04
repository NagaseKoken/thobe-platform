
import Navbar from "@/components/reusable/navbar";
import PageLayout from "@/components/reusable/PageLayout";
import HeaderSection from "@/components/reusable/HeaderSection";
import Footer from "@/components/reusable/Footer";
import DeleteProductsTabs from "@/components/products/DeleteProductsTabs";

export default function OrdersPage() {

  return (
    <>
      <Navbar />

      <PageLayout>
        <HeaderSection
          title="Delete Products or Fabrics"
        />

        <main>
          <DeleteProductsTabs />
        </main>
      </PageLayout>

      <Footer />
    </>
  );
}
