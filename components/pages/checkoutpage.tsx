"use client"

import { useEffect, useState } from "react";
import { fetchProducts } from "../../data/product";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Checkout from "../shared/checkout";


interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

declare global {
  interface Window {
    snap: any;
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
    .then((fetchedProducts: Product[]) => {
      setProducts(fetchedProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="w-full mx-auto sm:p-16 flex justify-evenly items-center">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {product.name}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="mt-1.5 text-sm text-gray-700">Rp {product.price}</p>
            <p className="py-4 text-sm text-gray-700">
              {product.description}
            </p>
          </CardContent>
          <CardFooter className='flex items-center justify-center'>
            <Checkout product={product} />
          </CardFooter>
        </Card>
      ))}
    </main>
  );
}
