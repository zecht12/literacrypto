"use client";

import { Button } from "../ui/button";
import { v4 as uuidv4 } from 'uuid'

const Checkout = ({ price, name }: { price: string; name: string }) => {

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_details: {
            name: name,
            price: price,
            quantity: 1,
          },
          transaction_details: {
            order_id: uuidv4(),
            gross_amount: Number(price) * 1,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Payment Success:", data);
        // setPaymentStatus("Payment Successful");
      } else {
        console.error("Failed to process payment");
        // setPaymentStatus("Payment Failed");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // setPaymentStatus("Payment Error");
    }
  };

  return (
    <div>
      <h1>Main Page</h1>
      <Button onClick={handleSubscribe}>Subscribe</Button>
    </div>
  );
};

export default Checkout;