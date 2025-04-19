
import { ItemsCard } from "@/components/reusable/items";
import Navbar from "@/components/reusable/navbar";

import {stores} from "@/components/reusable/store-card"
import Image from 'next/image';
import Footer from "@/components/reusable/Footer";

interface StoreProps {
    params:{ storeId: string },
}
const StorePage = async ({params}:StoreProps) => {
    const { storeId } = await params;
    const store = stores.find(store => store.id ===storeId)
    console.log(store)
    return ( 
        <div>
            <Navbar />
            <div className="w-full flex flex-col items-center mt-14 gap-5">
            <h1 className=" text-black text-4xl  flex justify-center ">{store?.name}</h1>
                <div className="lg:w-4xl w-full md:block  sm:flex sm:justify-center sm:items-center flex justify-center items-center">
                    <div className="relative md:aspect-[4/2] overflow-hidden rounded-lg s">
                        <Image src={store?.imageString || ''} alt={store?.name || ''}  width={500}  height={500} className="object-cover md:w-full md:h-full sm:w-[400px] sm:h-[400px] rounded-lg"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30  rounded-lg w-full h-full ">
                    
                        </div>
                    </div>

                </div>
                
            </div>
            {store && (
                <ItemsCard storeId={store.id} imageString="" itemId="" name="" price={1} type="" />
            )}
            <div className="mt-20">
                <Footer />
            </div>
        </div> 
    );
}
 
export default StorePage;