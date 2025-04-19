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

export const Navbar = ({admin, owner}: NavBarProps) => {
    return ( 
        <div className="px-4 py-3 flex justify-between items-center">
            <div className="text-3xl">THOBEMARKET</div>
            <div className="flex justify-center gap-8 items-center text-xl ">
                <div className="xl:font-semibold font-xl xl:text-2xl "><Link href="/home">Home</Link></div>
                <div className="xl:font-semibold font-xl xl:text-2xl "><Link href="/home/stores">Stores</Link></div>
                {admin && <div>Dashboard</div>}
                {owner && <div>My Store</div>}
                <div className="xl:font-semibold font-xl xl:text-2xl ">Orders</div>
                <div> 
                    <DropdownMenu>
                    <DropdownMenuTrigger className="text-center cursor-pointer"><div className="xl:font-semibold font-xl xl:text-2xl ">Contact Us <ChevronDown className="w-4 h-4 inline"/></div></DropdownMenuTrigger> 
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem className="hover:bg-slate-100 transition ease-in-out delay-75"><a href="tel:059xxxxxxx">059-xxx-xxxx</a></DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-100 transition ease-in-out delay-75"><a href="mailto:someone@example.com">thobePlatforme@gmail.com</a></DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
            <div className="flex justify-center items-center gap-6">
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

                        <Link href='/auth/login'>
                            <DropdownMenuItem>
                                <LogOut className="h-4 w-4 mr-2" />
                                Login
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
 
