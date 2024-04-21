import React from "react";

declare global {
  interface Window {
    snap: any;
  }
}

const Checkout = ({ product }) => {
  const checkout = async () => {
    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    };

    const response = await fetch("/api/payments", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const requestData = await response.json();

    window.snap.pay(requestData.token);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;