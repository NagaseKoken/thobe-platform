import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface itemInfoProps {
    name:string,
    type:string,
    state:boolean,
    changeState:any,
    price:Number,

}
export const ItemInfo = ({name,type,state,changeState,price}:itemInfoProps) => {
    return ( 
        <Dialog open={state} onOpenChange={() => changeState(!state)}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">{name}<br/>{type} - {price}</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-md font-medium grid grid-cols-2  gap-3">
                    
                    
                        <div>
                            <Label className="text-md font-medium">arm width (cm)</Label>
                            <Input type="number" placeholder="xx-cm" className="w-1/2"/>
                        </div>
                        <div>
                            <Label className="text-md font-medium">chest width (cm)</Label>
                            <Input type="number" placeholder="xx-cm" className="w-1/2"/>
                        </div>
                        <div>
                            <Label className="text-md font-medium">sholder width (cm)</Label>
                            <Input type="number" placeholder="xx-cm" className="w-1/2"/>
                        </div>
                        
                        <div>
                            <Label className="text-md font-medium">sholder width (cm)</Label>
                            <Input type="number" placeholder="xx-cm" className="w-1/2"/>
                        </div>
                  
                        <Button className="col-span-2"><Link href="/cart" className="w-full h-full">Add to cart</Link></Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
     );
}
 
