"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { cn } from '../../lib/utils'
import { Open_Sans } from 'next/font/google'
import { Router } from 'next/router'

const button = Open_Sans({
    subsets: ["latin"],
    weight: ["800"]
})



export default function Navbar() {
    useEffect(() => {

        const routerEvent = 'beforeHistoryChange';

        const evntHandler = () => {
            window.scroll(0, 0);
        };

        Router.events.on(routerEvent, evntHandler);

        return () => {
            Router.events.off(routerEvent, evntHandler);
        };
    }, []);
    return (
        <div className=" fixed xl:w-full md:w-full sm:w-full xs:w-full flex justify-center items-center w-auto h-20 z-[100]">
            <div className='flex justify-between items-center w-full h-full px-6 2xl:px-16 '>
                <div className='flex items-center justify-start'>
                    <Image src="/images/logo.png" alt="image" width={40} height={40} className='rounded-full' />
                    <h1 className='font-CodecProExtraBold md:text-2xl text-slate-100'>LiteraCrypto</h1>
                </div>
                <div>
                    <ul className='flex xl:hidden md:hidden sm:hidden xs:hidden'>
                        <li className={cn('md:ml-10 rounded-full bg-slate-100 hover:bg-blue-400')}>
                            <Link href='#membership'>
                                <p className={cn('text-sm text-black uppercase md:px-8 px-4 py-2', button.className)}>Daftar</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='xl:flex md:flex sm:flex xs:flex hidden justify-between items-center gap-8'>
                        <li className='md:ml-10 text-sm font-CodecProBold text-slate-100 uppercase hover:text-blue-400 '>
                            <Link href='/'>
                                <p>HOME</p>
                            </Link>
                        </li>
                        <li className='md:ml-10 text-sm font-CodecProBold text-slate-100 uppercase hover:text-blue-400 '>
                            <Link href='/#opportunity'>
                                <p>Keuntungan</p>
                            </Link>
                        </li>
                        <li className={cn('md:ml-10 rounded-full bg-slate-100 hover:bg-blue-400')}>
                            <Link href='#membership'>
                                <p className={cn('text-sm text-black uppercase md:px-8 px-4 py-2', button.className)}>Daftar</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}