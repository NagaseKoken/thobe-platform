import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components//ui/label";
import { Trash2 } from 'lucide-react';
export const CartItem = () => {
    return ( 
        <div className="flex shadow-sm border-y-1 gap-4 p-4 rounded-md md:w-[550px]">
            <Image src="/store.png" alt="arm image" width={150} height={150} className="rounded-md"/>
            <div className="flex flex-col justify-between ">
                <div className="font-semibold">name & Description & price</div>
                <div className="flex gap-5 items-baseline-last md:items-center">
                    <div className="flex flex-col gap-2 md:flex-row">
                        <Label>amount:</Label>
                        <Input type="number" defaultValue={1}  className="w-[50px] shadow-sm"/>
                    </div>
                    <Trash2 />
                </div>
            </div>
        </div>
     );
}
 
