// lib/saveMeasurements.ts
import { db } from '@/lib/db'; // Prisma client

// Default export of the saveMeasurements function
export default async function saveMeasurements(
  userId: number, 
  chest: string, 
  waist: string, 
  hips: string, 
  height: string
) {
  try {
    const measurement = await db.measurement.upsert({
      where: { userId },
      update: { chest, waist, hips, height },
      create: { userId, chest, waist, hips, height },
    });

    return measurement; 
  } catch (error) {
    throw new Error('Error saving measurements: ' + error); 
  }
}
