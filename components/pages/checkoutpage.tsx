/* eslint-disable @next/next/no-async-client-component */

import { db } from "@/lib/db";
import Checkout from "../shared/checkout";

async function getKelas() {
  const data = await db.kelas.findMany();
  return data;
}

const CheckoutPage = async () => {
  const kelas = await getKelas();

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
            <Checkout price={item.name} itemName={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;
