import { NextApiRequest, NextApiResponse } from 'next';
import { MidtransClient } from 'midtrans-node-client';
import { db } from '@/lib/db';

const snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { id, productName, price, quantity } = req.body;

            const parameter = {
                item_details: {
                    name: productName,
                    price: price,
                    quantity: quantity,
                },
                transaction_details: {
                    order_id: id,
                    gross_amount: price * quantity,
                },
            };

            const token = await snap.createTransactionToken(parameter);

            console.log(token);

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
