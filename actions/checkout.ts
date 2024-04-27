"use server"

import { PrismaClient } from '@prisma/client';
import { sendEmailPayment } from '../lib/mail';
import { CheckoutSchema } from '../schemas';
import * as z from 'zod';

const prisma = new PrismaClient();

export async function checkout(data: z.infer<typeof CheckoutSchema>) {
    try {
        const validData = CheckoutSchema.parse(data);
        const transaction = await prisma.transaction.create({
            data: {
                customersName: validData.customersName,
                email: validData.email,
                phone: validData.phone,
                productName: validData.productName,
                amount: validData.amount,
                quantity: validData.quantity,
            },
        });
        await sendEmailPayment(validData.email);

        return {
            success: true,
            message: 'Checkout successful',
            transaction,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Checkout failed',
            error: error.message,
        };
    }
}
