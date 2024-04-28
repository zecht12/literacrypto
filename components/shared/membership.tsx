/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react";
import { fetchProducts } from "../../data/product";
import { Card, CardContent } from "../ui/card";
import Checkout from "./checkout";
import { cn } from "../../lib/utils";
import { League_Spartan, Open_Sans, Montserrat, Poppins } from "next/font/google";
import Image from "next/image";

const head = League_Spartan({
    subsets: ["latin"],
    weight: ["700"]
});

const subHead = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const body = Montserrat({
    subsets: ["latin"],
    weight: ["400"]
});

const bodyBold = Montserrat({
    subsets: ["latin"],
    weight: ["600"]
});

const button = Open_Sans({
    subsets: ["latin"],
    weight: ["500"]
})


interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
}

export default function Membership() {
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
        <div id="membership" className="w-full md:h-screen h-auto bg-image5 bg-center mx-auto xl:px-16 md:px-12 sm:px-8 px-6 xl:py-16 md:py-12 sm:py-8 py-12">
            <div className="md:flex flex-none md:justify-between justify-center items-center">
                <div className="w-full md:w-4/6">
                    <p className={cn("text-4xl md:text-7xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-justify text-center", head.className)}>
                        Our Membership
                    </p>
                    <p className={cn("text-lg md:text-3xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-start text-justify xl:py-6 md:py-4 sm:py-2 py-4", bodyBold.className)}>
                        Tidak perlu membayar hingga jutaan rupiah.
                    </p>
                    <p className={cn("text-lg md:text-3xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-start text-justify", body.className)}>
                        Kami menawarkan program membership dengan harga yang cukup terjangkau.
                    </p>
                    <p className={cn("text-3xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-justify text-center xl:pt-6 md:pt-4 sm:pt-2 pt-4 xl:pb-0 md:pb-0 sm:pb-8 pb-4", subHead.className)}>
                        Join us!
                    </p>
                </div>
                <div className="flex flex-col xl:space-y-6 md:space-y-4 sm:space-y-2 space-y-1 w-full md:w-2/6">
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
