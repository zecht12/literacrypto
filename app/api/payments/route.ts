import { MidtransClient } from 'midtrans-node-client';
import { NextRequest, NextResponse } from 'next/server';

let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request: NextRequest) {
    try {
        const { id, productName, price, quantity, customersFirstName, customersLastName, email, phone } = await request.json();

        let parameter = {
            item_details: {
                name: productName,
                price: price,
                quantity: quantity,
            },
            transaction_details: {
                order_id: id,
                gross_amount: price * quantity,
            },
            "customer_details": {
                "first_name": customersFirstName,
                "last_name": customersLastName,
                "email": email,
                "phone": phone
            }
        };

        const token = await snap.createTransactionToken(parameter);
        console.log(token);
        

        return NextResponse.json({
            token
        });
    } catch (error) {
        console.error("Error processing checkout:", error);
    }
}
