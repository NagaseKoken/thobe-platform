import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, chest, waist, hips, height } = req.body;

    try {
      const measurement = await db.measurement.upsert({
        where: { userId },
        update: { chest, waist, hips, height },
        create: { userId, chest, waist, hips, height },
      });
      res.status(200).json(measurement);
    } catch (error) {
      res.status(500).json({ error: 'Error saving measurements' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
