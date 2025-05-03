"use server"

import * as z from 'zod'
import { AuthError } from 'next-auth'

import { db } from '@/lib/db'
import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas/index' 
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { getUserbyEmail } from '@/data/user'
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

export const login = async (values : z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success)  return {error:"Invalid fields!"}

    const {email,password,code} = validatedFields.data
    
    const existingUser = await getUserbyEmail(email)
    
    if(!existingUser || !existingUser.email || !existingUser.password) return {error:"Email doesn't exist!"}
    
    if(!existingUser.emailVerified){
        
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email,verificationToken.token)
        return {success: "Confimation is done"}
    }


    if(existingUser.isTwoFactorEnabled && existingUser.email){

     if(code){
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        if(!twoFactorToken) return{error: "Invalid code!"}
        if(twoFactorToken.token !==code) return {error: "Invalid code!"}
        const hasExpired = new Date(twoFactorToken.expires) < new Date()
        if(hasExpired) return {error:'Code expired!'}
        
        
        await db.twoFactorToken.delete({
            where:{id:twoFactorToken.id}
        })


        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if(existingConfirmation){
            await db.twoFactorConfirmation.delete({
                where:{id:existingConfirmation.id}
            })
        }
        await db.twoFactorConfirmation.create({
            data:{userId:existingUser.id}
        })


     }else{   
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorEmail(existingUser.email,twoFactorToken.token)
        return {twoFactor: true}
    }}


    try{
        await signIn("credentials",{email,password,redirectTo:DEFAULT_LOGIN_REDIRECT})
    }catch(error){
        if(error instanceof AuthError){
            switch(error.name){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"}
                default:
                    return {error:"Something went wrong!"}
            }

        }
        throw error
    }

    return {success: "successful login"}
}


