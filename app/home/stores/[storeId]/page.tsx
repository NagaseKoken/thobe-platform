import { ItemsCard } from "@/components/reusable/items";
import Navbar from "@/components/reusable/navbar";
import Image from 'next/image';
import Footer from "@/components/reusable/Footer";
import { getItemsById } from "@/data/items";
import { getStoreById } from "@/data/stores";
import { notFound } from "next/navigation";

interface StoreProps {
    params: Promise<{ storeId: string }>
}

const StorePage = async ({ params }: StoreProps) => {
    try {
        // Await the params before destructuring
        const resolvedParams = await params;
        const { storeId } = resolvedParams;

        if (!storeId) {
            return notFound();
        }

        const store = await getStoreById(storeId);
        
        if (!store) {
            return notFound();
        }

        const items = await getItemsById(storeId);
        
        return ( 
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="w-full flex flex-col items-center mt-14 gap-5">
                    <h1 className="text-black text-4xl flex justify-center">{store.name}</h1>
                    <div className="lg:w-4xl w-full md:block sm:flex sm:justify-center sm:items-center flex justify-center items-center">
                        <div className="relative md:aspect-[4/2] overflow-hidden rounded-lg">
                            <Image 
                                src={"/download.jpg"} 
                                alt={store.name} 
                                width={500} 
                                height={500} 
                                className="object-cover md:w-full md:h-full sm:w-[400px] sm:h-[400px] rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 rounded-lg w-full h-full" />
                        </div>
                    </div>
                </div>
                
                <div className="flex-grow">
                    <ItemsCard 
                        items={items || []}
                        storeId={storeId}
                    />
                </div>
                
                <div className="mt-20">
                    <Footer />
                </div>
            </div> 
        );
    } catch (error) {
        console.error("Error loading store:", error);
        return notFound();
    }
}

export default StorePage;