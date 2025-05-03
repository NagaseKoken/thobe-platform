import { db } from '@/lib/db'

export const getUserbyEmail = async (email:string) => {
    try{
        const user = db.user.findUnique({
            where:{
              email  
            }
        })
        return user
    }catch{
        null
    }
}

export const getUserbyId = async (id:string) => {
    try{
        const user = db.user.findUnique({
            where:{
              id  
            }
        })
        return user
    }catch{
        null
    }
}
