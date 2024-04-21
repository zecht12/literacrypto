import { MidtransClient } from "midtrans-node-client";
import { NextRequest } from "next/server";

let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request:NextRequest) {
    const { id, name, price, quantity } = await request.json();

    let parameter = {
        item_details: {
            name: name,
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

    return Response.json({
        token
    })
}