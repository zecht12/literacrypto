/* eslint-disable react/no-unescaped-entities */
"use client"

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

export default function Oportunity1() {
    return (
        <div id="oportunity" className="w-full h-screen md:bg-image6 bg-image7 md:bg-center bg-right-top bg-cover mx-auto xl:px-16 md:px-12 sm:px-8 px-6 xl:pt-24 md:pt-16 sm:pt-16 pt-12 md:flex flex-none md:justify-start justify-center items-center">
            <div className="w-full">
                <p className={cn("text-4xl md:text-7xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-justify text-center", head.className)}>
                    5x Portofolio
                </p>
                <p className={cn("text-lg md:text-3xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-start text-justify xl:py-6 md:py-4 sm:py-2 py-4", body.className)}>
                    Kami memiliki visi untuk membantu anda dalam mewujudkan mimpi mencapai pertumbuhan portofolio yang realistis dengan target 3-5x lipat.
                </p>
            </div>
        </div>
    );
}
