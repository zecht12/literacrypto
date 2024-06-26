/* eslint-disable react/no-unescaped-entities */
"use client"

import { Variants, motion } from "framer-motion";
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

const cardVariants: Variants = {
    offscreen: {
        x: -50,
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
        y: -50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.8
        }
    }
};

export default function Oportunity3() {
    return (
        <div className="w-full md:h-screen h-auto md:bg-image8 bg-image4 bg-auto bg-center mx-auto xl:px-16 md:px-12 sm:px-8 px-6 md:flex flex-none md:justify-start justify-center md:items-center items-center xl:pt-0 md:pt-0 sm:pt-16 pt-12">
            <div className="w-full h-full">
                <div>
                    <motion.p initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className={cn("text-4xl md:text-7xl text-slate-100 font-bold md:max-w-xl max-w-full md:text-justify text-center", head.className)}>
                        Update Harian
                    </motion.p>
                    <motion.p initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants} className={cn("text-lg md:text-3xl text-slate-100 font-bold md:max-w-[416px] max-w-full md:text-start text-justify xl:py-6 md:py-4 sm:py-2 py-4", body.className)}>
                        Update rutin setiap hari outlook coin yang kami call dan berita-berita terkini yang berhubungan dengan market crypto.
                    </motion.p>
                </div>
                <div className="flex md:hidden flex-col items-center justify-center space-y-6 w-full md:w-2/6">
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1}>
                        <Image alt="logo" width="1000" height="1000" src="/images/Assets1.jpeg" className="w-[350px] h-[300px] rounded-xl" />
                    </motion.div>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1}>
                        <Image alt="logo" width="1000" height="1000" src="/images/Assets2.jpeg" className="w-[350px] h-[450px] rounded-xl" />
                    </motion.div>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1}>
                        <Image alt="logo" width="1000" height="1000" src="/images/Assets3.jpeg" className="w-[350px] h-[350px] rounded-xl" />
                    </motion.div>
                    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }} variants={cardVariants1}>
                        <Image alt="logo" width="1000" height="1000" src="/images/Assets4.jpeg" className="w-[350px] h-[450px] rounded-xl" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
