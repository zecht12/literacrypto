/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { cn } from "../../lib/utils";
import { Poppins, Montserrat, League_Spartan, Open_Sans } from "next/font/google";
import Image from "next/image";

const head = Poppins({
    subsets: ["latin"],
    weight: ["700"]
});

const subHead = Poppins({
    subsets: ["latin"],
    weight: ["500"]
});

const body = Poppins({
    subsets: ["latin"],
    weight: ["400"]
});

const About = () => {
    return (
        <div className="w-full md:h-screen h-auto xl:flex md:flex justify-between items-center mx-auto xl:px-16 md:px-12 sm:px-8 px-6 bg-black">
            <div className="max-w-lg">
                <p className={cn("text-[#b98614] text-3xl xl:pt-8 md:pt-6 sm:pt-5 pt-12 md:text-start text-center ", head.className)}>
                    Let's talk with us
                </p>
                <p className={cn("text-slate-100 text-base text-justify xl:pt-8 md:pt-6 sm:pt-5 pt-4", body.className)}>
                    Kami literacrypto tidak memperjual belikan website kami dimanapun Dan dengan siapapun. Tidak diperkenankan untuk menggandakan, mendistribusikan, atau menggunakan konten kami tanpa izin tertulis dari LiteraCrypto.
                </p>
                <p className={cn("text-[#b98614] text-3xl xl:py-8 md:py-6 sm:py-5 py-4 md:text-start text-center", subHead.className)}>
                    Instagram
                </p>
                <p className={cn("text-slate-100 text-base md:text-start text-center", body.className)}>
                    @literacrypto
                </p>
                <p className={cn("text-[#b98614] text-3xl xl:py-8 md:py-6 sm:py-5 py-4 md:text-start text-center", subHead.className)}>
                    X
                </p>
                <p className={cn("text-slate-100 text-base md:text-start text-center", body.className)}>
                    @literacrypto
                </p>
            </div>
            <div className="xl:pr-16 md:pr-8 sm:pr-0 pr-0 xl:py-0 md:py-0 sm:py-12 py-8 flex items-center justify-center">
                <Image alt="logo" width="1000" height="1000" src="/images/logo.png" className="w-[250px] h-[250px]" />
            </div>
        </div>
    )
}

export default About