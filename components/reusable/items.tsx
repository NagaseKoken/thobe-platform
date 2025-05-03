'use client'
import Image from "next/image";
import { CardCover } from "@/components/reusable/card-cover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ItemInfo } from "@/components/reusable/item-info";
import { useState } from "react";
export interface itemsCardProp {
    imageString:string,
    storeId: string,
    itemId:string,
    name: string,
    price: number,
    type: string,
}

  
export const items:itemsCardProp[] =[
    { storeId: 'store1', itemId:"item1",price:150, name: 'thobe', imageString:"/store.png",type:"Saudi" },
    { storeId: 'store2',price:150, itemId:"item2", name: 'thobe', imageString:"/download.jpg",type:"Qatar" },
  ]; 
export const ItemsCard = ({storeId}:itemsCardProp) => {
    const [open,setOpen] = useState(false)
    return ( 
        <>
        <h1 className="px-10 text-3xl mt-8">Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center px-10 mt-4">
            
           {items.map( (item) =>  item.storeId === storeId ? (
            <div className="relative h-48 "  key={item.itemId}>
            
                <Image src={item.imageString} alt="store" className="rounded-sm absolute w-full h-full object-cover" width={400} height={400} />
                <div className="h-48 relative z-10 w-full transform transition duration-500 opacity-100">
                    <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                        <Image src={item.imageString} alt="store" width={400} height={400} className="absolute rounded-lg h-full w-full -z-10 object-cover "/>
                        <CardCover name={item.name} price={item.price} type={item.type}/>
                        <Button className="absolute bottom-0 right-0 m-3 rounded-xl bg-black shadow-xl text-md cursor-pointer p-3" onClick={() => setOpen(true)}>Make Order</Button>
                    </div>
                </div>
                <ItemInfo name={item.name} type={item.type} price={item.price} state={open} changeState={setOpen}/>  
            </div>   
           ): ""
           )}
           
               
           </div>
           </>
     );
}
 
