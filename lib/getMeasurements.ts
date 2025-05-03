import { db } from '@/lib/db'; 

export async function getMeasurements(userId: number) {
  try {
    const measurements = await db.measurement.findUnique({
      where: { userId },
    });

    return measurements; 
  } catch (error) {
    throw new Error('Error fetching measurements: ' + error); 
  }
}
