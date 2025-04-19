"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuSeparator, DropdownMenuTrigger  } from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage,  } from "@/components/ui/avatar"
import Link from "next/link";
import { ChevronDown, Search, ShoppingBag,LogOut   } from 'lucide-react';

interface NavBarProps {
    admin?: boolean,
    owner?: boolean,
    customer?:boolean,
}

const Navbar = ({admin, owner}: NavBarProps) => {
    return ( 
        <div className="px-4 py-3 flex justify-between items-center w-full">
            <div className="text-3xl">THOBEMARKET</div>
            <div className="hidden justify-center gap-8 items-center text-xl md:flex">
                <div><Link href="/home">Home</Link></div>
                <div>Stores</div>
                {admin && <div>Dashboard</div>}
                {owner && <div>My Store</div>}
                <div className=" ">Orders</div>
                <div> 
                    <DropdownMenu>
                    <DropdownMenuTrigger className="text-center cursor-pointer"><div >Contact Us <ChevronDown className="w-4 h-4 inline"/></div></DropdownMenuTrigger> 
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem className="hover:bg-slate-100 transition ease-in-out delay-75"><a href="tel:059xxxxxxx">059-xxx-xxxx</a></DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-100 transition ease-in-out delay-75"><a href="mailto:someone@example.com">thobePlatforme@gmail.com</a></DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
            <div className="hidden justify-center items-center gap-6 md:flex">
                <span><Search /></span>
                <span><Link href="/cart"><ShoppingBag /></Link></span>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={""} />
                                <AvatarFallback><FaUser/></AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger> 
                    <DropdownMenuContent align="start">

                        <Link href='/'>
                            <DropdownMenuItem>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                                {/*  this should be login but for test purposes its login  */}
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
            </div>
        </div>
     );
}
export default Navbar;