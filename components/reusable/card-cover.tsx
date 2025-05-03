import { Decimal } from '@prisma/client/runtime/library';
import { ShoppingBag } from 'lucide-react';
interface CardCoverProps {
    name:string,
    city?:string,
    price?:number,
    type?:string,
    storeId?:string,
    cartId?:string,
    cart?:boolean,
    googleMapUrl?:string
}
export const CardCover = ({cart,name,cartId,city,googleMapUrl,storeId,type,price}:CardCoverProps) => {
    return ( 
        <>
            <div className='p-3 absolute bottom-0 left-0'>
                <h1 className='text-white font-bold line-clamp-1 text-xl'>{name}</h1>
                <div className='flex gap-2 items-center '>
                {city && <p className='text-white line-clamp-1 text-xl'>{city}</p>}
                { (type || price) &&   <p className='text-white line-clamp-1 text-xl'>{`${type} - ${price}SR`}</p>}
                </div>
            </div>
        </>
    );
}
 
