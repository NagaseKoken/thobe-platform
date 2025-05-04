import { db } from "@/lib/db";

export const getStores = async () => {
    try{
        const stores = db.store.findMany()
        return stores
    }catch{
        null
    }
}

export const getStoreById = async (id:string) => {
    try{
        const store = db.store.findUnique({
            where:{
                id:id
            }
        })
        return store
    }catch{
        null
    }
}