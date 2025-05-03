import { db } from "@/lib/db";

export const getOrder = async () => {
    try{
        const orders = db.order.findMany()
        return orders
    }catch{
        null
    }
}

export const getOrderById = async (id:string,userId:string) => {
    try{
        const order = db.order.findUnique({
            where:{
                id:id,
                customerId:userId
            }
        })
        return order
    }catch{
        null
    }
}

