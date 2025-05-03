"use server"

import { signOut } from "@/auth";
export const logout = async () => {
    // server actions if needed before logingOut the user
    await signOut()
}
 
