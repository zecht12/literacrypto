"use client";
import { useState } from "react";
import { Button } from "../ui/button";

const Checkout = ({ price, itemName }: { price: string; itemName: string }) => {
  // const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_details: {
            name: itemName,
            price: price,
            quantity: 1,
          },
          transaction_details: {
            order_id: "1409184098430981203498",
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
      <button onClick={handleSubscribe}>Subscribe</button>
      {/* {paymentStatus && <p>{paymentStatus}</p>} */}
    </div>
  );
};

export default Checkout;
