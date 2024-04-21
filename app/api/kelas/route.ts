import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function GET(req: NextRequest) {
    try {
        if (req.method !== 'GET') {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        const kelas = await prisma.kelas.findMany();
        return NextResponse.json(kelas);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
