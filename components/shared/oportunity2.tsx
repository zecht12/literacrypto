"use client"

import React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { League_Spartan, Montserrat, Open_Sans, Poppins } from 'next/font/google';
import { Variants, motion } from 'framer-motion';

const head = League_Spartan({
    subsets: ["latin"],
    weight: ["700"]
});

const subHead = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

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
});

const cardVariants: Variants = {
    offscreen: {
        x: -70,
        opacity: 0
    },
    onscreen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.8
        }
    }
};

const cardVariants1: Variants = {
    offscreen: {
        x: 70,
        opacity: 0
    },
    onscreen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.8
        }
    }
};

export const Oprtunity2 = () => {
    return (
        <div className="w-full md:h-screen h-auto bg-image3 bg-center mx-auto xl:px-16 md:px-12 sm:px-8 px-6 xl:pt-24 md:pt-16 sm:pt-16 pt-12">
            <div className='flex flex-col md:justify-end md:items-start justify-center items-center'>
                <motion.p initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className={cn("text-4xl md:text-7xl text-slate-100 font-bold md:text-justify text-center", head.className)}>
                    Beragam Keuntungan
                </motion.p>
                <div className='md:flex justify-start items-center xl:py-20 md:py-16 sm:py-10 py-6 md:space-y-0 md:space-x-8 space-y-4 space-x-0 font-extrabold'>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1} >
                        <Card className='w-[350px]'>
                            <CardHeader className="text-center font-CodecProExtraBold text-xl">
                                Analisa Coin
                            </CardHeader>
                            <CardContent>
                                <CardDescription className={cn("text-justify text-black", body.className)}>
                                    Riset yang mendalam baik secara teknikal maupun fundamental mengenai coin-coin yang berpotensi mengalami kenaikan secara signifikan.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1} >
                        <Card className='w-[350px]'>
                            <CardHeader className="text-center font-CodecProExtraBold text-xl">
                                Materi
                            </CardHeader>
                            <CardContent>
                                <CardDescription className={cn("text-justify text-black", body.className)}>
                                    Riset yang mendalam baik secara teknikal maupun fundamental mengenai coin-coin yang berpotensi mengalami kenaikan secara signifikan.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1} >
                        <Card className='w-[350px]'>
                            <CardHeader className="text-center font-CodecProExtraBold text-xl">
                                Community
                            </CardHeader>
                            <CardContent>
                                <CardDescription className={cn("text-justify text-black", body.className)}>
                                    Riset yang mendalam baik secara teknikal maupun fundamental mengenai coin-coin yang berpotensi mengalami kenaikan secara signifikan.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
