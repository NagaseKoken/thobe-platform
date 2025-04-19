import { CartItem } from "@/components/reusable/cart-item";
import { Navbar } from "@/components/reusable/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const Cart = () => {
    return ( 
    <div>
        <Navbar/>
        <div className="flex flex-col gap-5 md:flex-row justify-between items-start p-4 m-10">
            <div className="grid"><CartItem /></div>
            <div>
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        <div className="flex justify-between">                        
                            <p>subtotal</p>
                            <p>xxxSR</p>
                        </div>
                        <div className="flex justify-between">                        
                            <p>Estimated tax</p>
                            <p>xxxSR</p>
                        </div>
                        <div className="flex justify-between">                        
                            <p>Total</p>
                            <p className="font-bold">xxxSR</p>
                        </div>
                        
                        <Button className="bg-amber-500 text-white shadow-sm rounded-xl hover:bg-amber-700">Check out</Button>
                        <hr />
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        
                        <p className="text-start w-full">Promot code</p>
                        <div className="flex items-center gap-2 ">
                            <Input className="flex-1 " placeholder="meow"/>
                            <Button className="hover:bg-amber-700 bg-amber-500 text-white shadow-sm rounded-xl">Apply</Button>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        </div>
    </div> );
}
 
export default Cart;