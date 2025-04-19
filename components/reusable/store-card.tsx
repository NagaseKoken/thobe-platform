import Image from "next/image";
import { CardCover } from "@/components/reusable/card-cover";
import Link from "next/link";
export interface StoreCardProps {
    imageString:string,
    id: string,
    name: string,
    city:string,
}

  
  export const stores: StoreCardProps[] = [
    { id: 'store1',city:"Dammam", name: 'alaseel', imageString:"/store.png" },
    { id: 'store2',city:"Qatif", name: 'myStore', imageString:"/download.jpg" },
  
  ]; 
export const StoreCard = () => {
    return ( 
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center px-10 mt-8">
        
           {stores.map((store) => (
            <div className="relative h-48 "  key={store.id}>
            <Link href={`/home/stores/${store.id}`} className="w-full h-full">
                <Image src={store.imageString} alt="store" className="rounded-sm absolute w-full h-full object-cover" width={400} height={400} />
                <div className="h-48 relative z-10 w-full transform transition duration-500  opacity-0 hover:opacity-100">
                    <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                        <Image src={store.imageString} alt="store" width={400} height={400} className="absolute rounded-lg h-full w-full -z-10 object-cover "/>
                        <CardCover name={store.name} city={store.city} cartId="store.cart[0].id" storeId="store.id" googleMapUrl="www.googlemap.com" cart={false} key="store.id"/>
                    </div>
                </div>
            </Link>
            </div>   
           ))}
           
                 
           </div>
     );
}
 
