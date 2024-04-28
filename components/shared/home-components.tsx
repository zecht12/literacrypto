"use client";

import { League_Spartan, Montserrat, Open_Sans, Poppins } from 'next/font/google';
import React from 'react'
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { Variants, motion } from 'framer-motion'

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
    weight: ["800"]
})

const cardVariants: Variants = {
    offscreen: {
        y: -70,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity:1,
        transition: {
            type: "spring",
            duration: 1.8
        }
    }
};

const Homecomponents = () => {
    return (
        <div className="w-full h-screen bg-image1 bg-center flex md:justify-start justify-center items-center mx-auto xl:px-16 md:px-12 sm:px-8 px-6 xl:pt-24 md:pt-16 sm:pt-16 pt-0">
            <div className="w-full md:w-5/6">
                <motion.p initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className={cn("text-4xl md:text-7xl text-slate-100 font-bold max-w-full md:text-start text-center", head.className)}>
                    Dapatkan Profit Maksimal Bersama Kami
                </motion.p>
                <motion.p initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className={cn("text-lg md:text-3xl text-slate-100 font-bold max-w-full md:text-start text-justify xl:py-6 md:py-4 sm:py-2 py-4", body.className)}>
                    Kami disini memberikan panduan dan saran-saran terbaik yang dapat menjadi pemandu kamu ketika pertama kali memasuki market.
                </motion.p>
                <motion.ul initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className='flex items-center md:justify-start justify-center'>
                    <Link href='#membership' className='rounded-full bg-slate-100 flex justify-center items-center h-[50px] md:w-[300px] sm:w-[290px] w-[280px] hover:bg-blue-400'>
                        <li className={cn('md:text-sm text-xs text-black text-center uppercase', button.className)}>
                            Lebih Lanjut
                        </li>
                    </Link>
                </motion.ul>
            </div>
        </div>
    )
}

export default Homecomponents