import Navbar from "@/components/reusable/navbar";

import { StoreCard } from "@/components/reusable/store-card";
import Footer from "@/components/reusable/Footer";

interface Store {
    id: string;
    name: string;
}
  

const StoresPage = () => {
    return ( 
        <div>
            <Navbar />
                <h1 className="text-4xl px-10 mt-6">Stores</h1>
            <StoreCard />
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </div>
     );
}
 
export default StoresPage;