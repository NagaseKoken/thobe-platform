import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const measurements = await db.measurement.findUnique({
        where: { userId: Number(userId) },
      });
      if (measurements) {
        res.status(200).json(measurements);
      } else {
        res.status(404).json({ error: 'Measurements not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching measurements' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
