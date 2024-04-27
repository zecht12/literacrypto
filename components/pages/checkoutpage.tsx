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
  }, []);

  return (
    <div className="w-full h-auto mx-auto sm:p-16 bg-black">
      <div className="flex justify-evenly items-center">
        <div>

        </div>
        <div className="flex flex-col xl:space-y-6 md:space-y-4 sm:space-y-2 space-y-1">
          <Card className="bg-gradient-to-r from-black to-[#b98614] border-none">
            <CardContent>
              <h3 className="mt-4 text-lg font-medium ">
                a
              </h3>
              <p className="mt-1.5 text-sm text-slate-100">Rp.</p>
              <p className="py-4 text-sm text-[#ffde59]">
                Rp.
              </p>
            </CardContent>
          </Card>
          {products.map((product) => (
            <>
              <Checkout product={product} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
