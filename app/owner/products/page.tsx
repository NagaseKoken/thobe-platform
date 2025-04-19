import Navbar from "@/components/reusable/navbar";

import PageLayout from "@/components/reusable/PageLayout";
import HeaderSection from "@/components/reusable/HeaderSection";
import OrderFooter from "@/components/reusable/Footer";
import AddProductForm from "@/components/products/AddProductForm";

export default function AddProductPage() {
  return (
    <>
      <Navbar />

      <PageLayout>
        <HeaderSection title="Add a New Product / Fabric" />

        <main>
          <AddProductForm />
        </main>
      </PageLayout>

      <OrderFooter />
    </>
  );
}