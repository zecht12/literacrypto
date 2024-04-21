import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const kelas = await db.kelas.findMany();
            res.status(200).json(kelas);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        const kelas = await db.kelas.findMany();
            res.status(200).json(kelas);
    }
}