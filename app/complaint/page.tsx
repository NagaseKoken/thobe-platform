import Navbar from "@/components/reusable/Navbar";
import PageLayout from "@/components/reusable/PageLayout";
import HeaderSection from "@/components/reusable/HeaderSection";
import OrderFooter from "@/components/reusable/OrderFooter";
import CreateComplaintForm from "@/components/reusable/CreateComplainForm";

export default function CreateComplaintPage() {
  return (
    <>
      <Navbar />

      <PageLayout>
        <HeaderSection title="Contact Us" />

        <main className="flex items-center justify-center w-full">
          <CreateComplaintForm />
        </main>
      </PageLayout>

      <OrderFooter />
    </>
  );
}