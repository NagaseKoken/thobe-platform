
import { PrismaAdapter } from "@auth/prisma-adapter"
import { JWT } from "@auth/core/jwt"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserbyId } from "@/data/user"
import NextAuth ,{ type DefaultSession} from "next-auth"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"




 //without this the session doesn't know the type of role
 //Since the session is destructuring to get the data
declare module "next-auth" {
  interface Session{
    user: DefaultSession['user'] & {//or replace this with UserRole ****
      role: "ADMIN" | "USER" | "WORKER" | "OWNER",
      // custom: string
    }
  }
}

//without this the token doesn't know the type of role
//the token is not the same as the session remember the token is not to destructure it is the raw data
declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER" | "WORKER" | "OWNER",
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  
  pages:{
    //when something goes wrong in signIn() it will redirect to the page of /auth/login
    signIn:"/auth/login",
    error:"/auth/error",
  },

  //to automatically provid verifiedemail field if using OAuth
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      })
    }
  },

  callbacks: {
    async signIn({user,account}){

      if(account?.provider !== 'credentials') return true //enable any other provider to signIn except credentails provider

      const existingUser = await getUserbyId(user.id as string)
      if(!existingUser?.emailVerified) return false //if the user didn't verifiy its email block him

       
      //FA2 
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation= await getTwoFactorConfirmationByUserId(existingUser.id);

        if(!twoFactorConfirmation) return false;
        await db.twoFactorConfirmation.delete({
          where:{id:twoFactorConfirmation.id}
        })
      }
      return true
    },

    async session({token,session}) {

      console.log({sessionToken: token})
      // session.user.custom = "anything"
      if(token.sub && session.user){
        session.user.id= token.sub 
      }
      if(token.role && session.user){
        session.user.role = token.role //or can import UserRole from prismaClient here ****
      }
      return session
    },

    async jwt({token}) {
      if(!token.sub) return token

      const existingUser = await getUserbyId(token.sub as string)

      if(!existingUser) return token

      token.role = existingUser.role
      console.log("TOKEN:",token)
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})