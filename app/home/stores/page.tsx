import { Navbar } from "@/components/reusable/navbar";
import { StoreCard } from "@/components/reusable/store-card";
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
        
    </div>
     );
}
 
export default StoresPage;