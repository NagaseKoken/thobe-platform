"use server"

import { db } from "@/lib/db"
import { getUserbyEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token:string) => {
    
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return {error:"Token does not exist!"}
    }
    
    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired){
        return {error:"Token has expired!"}
    }

    const existingUser = await getUserbyEmail(existingToken.email)

    if(!existingUser){
        return {error:"Email does not exist!"}
    }

    await db.user.update({
        where:{id:existingUser.id},
        data:{
            emailVerified: new Date(),
            email: existingToken.email //when the user want to modify his email
        }
    })

    await db.verficationToken.delete({
        where:{id:existingToken.id}
    })

    return {success:"Email verified!"}
}