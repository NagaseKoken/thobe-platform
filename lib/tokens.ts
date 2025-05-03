import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { db } from "@/lib/db"
import { getVerificationTokenByEmail } from '@/data/verification-token'

import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const generateVerificationToken = async (email:string) => {

    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken){
        await db.verficationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    const verficationToken = await db.verficationToken.create({
        data:{
            email,
            token,
            expires,
        }
    })
    console.log("/lib/verificationToken.ts:       ",verficationToken)
    return verficationToken
}



export const generateTwoFactorToken = async (email:string) => {
    const token = crypto.randomInt(100_000,1000000).toString();

    const expires = new Date(new Date().getTime()+ 3600*1000)
    
    const existingToken = await getTwoFactorTokenByEmail(email);
    if(existingToken){
        await db.twoFactorToken.delete({
            where:{id:existingToken.id}
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires,
        }
    })

    return twoFactorToken;
}