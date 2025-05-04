"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { useState } from "react";


type Fabric = {
    id: number;
    name: string;
    available: boolean;
  };
  
  type Product = {
    id: number;
    name: string;
    available: boolean;
  };
  

const fabrics: Fabric[] = [
{
    id: 1, name: "X", available: true
},
{
    id: 2, name: "Y", available: true
},
{
    id: 3, name: "Z", available: true
},
];

const products: Product[] = [
    {
        id: 1, name: "X", available: true
    },
    {
        id: 2, name: "Y", available: true
    },
    {
        id: 3, name: "Z", available: true
    },
];

export default function DeleteProductsTabs() {
    const [fabricsList, setFabricsList] = useState(fabrics);
    const [productsList, setProductsList] = useState(products);

    const onDelete = ({id, type}: {id: number, type: "Fabric" | "Product"})=> {
        if(type === "Fabric") {
            if(fabrics.find(fabric => fabric.id === id)) {
                setFabricsList(p=> p.filter(fabric => fabric.id !== id));
            }
        }
        else if(type === "Product") {
            if(products.find(product => product.id === id)) {
                setProductsList(p=> p.filter(product => product.id !== id));
            }
        }

    }
  return (
    <Tabs defaultValue="fabrics" className="w-full my-5">
      {/* Tab Triggers */}
      <TabsList
        aria-label="Order Tabs"
        className="w-max-md"
      >
        <TabsTrigger
          value="fabrics"
        >
          Fabrics   
     </TabsTrigger>

        <TabsTrigger
          value="products"
        >
          Products
        </TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="fabrics">
        <div className="flex flex-col gap-4">
            {fabricsList.length === 0 && <span className="text-muted-foreground">No fabrics available</span>}
            {fabricsList.map(fabric => {
                return (
                    <div key={fabric.id} className="flex flex-row justify-between items-center border-b border-muted-foreground py-2">
                        <span>{fabric.name}</span>
                        <Button className="cursor-pointer" variant={"destructive"}onClick={()=> onDelete({id: fabric.id, type: "Fabric"})}>Delete</Button>
                    </div>
                )
            })}
        </div>
      </TabsContent>

      <TabsContent value="products">
      <div className="flex flex-col gap-4">
        {productsList.length === 0 && <span className="text-muted-foreground">No products available</span>}
            {productsList.map(product => {
                return (
                    <div key={product.id} className="flex flex-row justify-between items-center border-b border-muted-foreground py-2">
                        <span>{product.name}</span>
                        <Button className="cursor-pointer" variant={"destructive"} onClick={()=> onDelete({id: product.id, type: "Product"})}>Delete</Button>
                    </div>
                )
            })}
        </div>

      </TabsContent>
    </Tabs>
  );
}