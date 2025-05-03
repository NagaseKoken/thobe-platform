import { db } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email:string) => {
    try{
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where:{email}
        })
        return twoFactorToken;
    }catch{
        return null;
    }
}


export const getTwoFactorTokenByToken = async (token:string) => {
    try{
        const passwordResetToken = await db.twoFactorToken.findUnique({
            where:{token}
        })
        return passwordResetToken
    }catch{
        return null;
    }
}
