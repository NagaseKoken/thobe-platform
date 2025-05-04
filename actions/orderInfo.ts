'use server'
import { db } from "@/lib/db";
import { currentUser } from "@/lib/server-current-user";
import { MeasurementsSchema } from "@/schemas";
import * as z from "zod";



export const orderInfo = async (values: z.infer<typeof MeasurementsSchema>) => {
    try {
        const validatedFields = MeasurementsSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: "Invalid fields!" }
        }

        const { chest, height, hips, waist } = validatedFields.data
        const user = await currentUser()
        
        if (!user || !user.id) {
            return { error: "Missing session" }
        }

        await db.measurement.create({
            data: {
                userId: user.id,
                chest: chest,
                waist: waist,
                hips: hips,
                height: height,
            }
        })

        return { success: true }
    } catch (error) {
        console.error("Error in orderInfo:", error)
        return { error: "Failed to save measurements" }
    }
}

