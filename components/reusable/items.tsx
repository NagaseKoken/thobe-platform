'use client'
import Image from "next/image";
import { CardCover } from "@/components/reusable/card-cover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ItemInfo } from "@/components/reusable/item-info";
import { useState, useEffect } from "react";
import { getItemsById } from "@/data/items";

export interface ItemData {
    id: string;
    storeId: string;
    name: string;
    description: string;
    price: number; // Ensure this is a number
    type: string;
    material: string | null;
    image: string;
    available: boolean;
    created_at: Date;
}

export interface itemsCardProp {
    storeId: string;
}

export const ItemsCard = ({ storeId }: itemsCardProp) => {
    const [items, setItems] = useState<ItemData[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getItemsById(storeId);
            if (data) {
                setItems(data);
            }
        };
        fetchItems();
    }, [storeId]);

    if (items.length === 0) {
        return <div className="px-10 text-center mt-8">No items found</div>;
    }

    return (
        <>
            <h1 className="px-10 text-3xl mt-8">Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center px-10 mt-4">
                {items.map((item) =>
                    item.storeId === storeId ? (
                        <div className="relative h-48" key={item.id}>
                            <Image
                                src={item.image}
                                alt="store"
                                className="rounded-sm absolute w-full h-full object-cover"
                                width={400}
                                height={400}
                            />
                            <div className="h-48 relative z-10 w-full transform transition duration-500 opacity-100">
                                <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                                    <Image
                                        src={item.image}
                                        alt="store"
                                        width={400}
                                        height={400}
                                        className="absolute rounded-lg h-full w-full -z-10 object-cover"
                                    />
                                    
                                    <CardCover name={item.name} price={item.price} type={item.type} />
                                    <Button
                                        className="absolute bottom-0 right-0 m-3 rounded-xl bg-black shadow-xl text-md cursor-pointer p-3"
                                        onClick={() => setOpen(true)}
                                    >
                                        Make Order
                                    </Button>
                                </div>
                            </div>
                            <ItemInfo
                                name={item.name}
                                type={item.type}
                                price={item.price}
                                state={open}
                                changeState={setOpen}
                            />
                        </div>
                    ) : null
                )}
            </div>
        </>
    );
};

