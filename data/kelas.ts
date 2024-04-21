import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getKelasByName(name: string) {
    try {
        const kelas = await prisma.kelas.findMany({
        where: { name: { contains: name } },
        });
        return kelas;
    } catch (error) {
        console.error(error);
        return [];
    }
}