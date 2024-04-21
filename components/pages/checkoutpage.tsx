/* eslint-disable @next/next/no-async-client-component */
'use client'

import { db } from "@/lib/db";

const CheckoutPage = async () => {
  const kelas = await db.kelas.findMany()

  return (
    <div>
      <h1>Main Page</h1>
      <h2>Kelas</h2>
      <ul>
        {kelas.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;