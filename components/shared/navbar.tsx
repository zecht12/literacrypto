import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Open_Sans } from 'next/font/google';
import { cn } from '../../lib/utils';

const button = Open_Sans({
    subsets: ["latin"],
    weight: ["800"]
})

const Navbar = () => {
    return (
        <div className="fixed xl:w-full md:w-full sm:w-full w-auto flex items-center justify-center h-20 z-100">
            <div className='flex md:justify-between justify-evenly items-center w-full h-full px-4 xl:px-16 md:px-12 sm:px-8'>
                <div className='flex md:justify-between justify-evenly items-center'>
                    <Image src="/images/logo.png" alt="image" width={40} height={40} className='rounded-full' />
                    <h1 className=' font-CodecProExtraBold text-xl text-slate-100'>LiteraCrypto</h1>
                </div>
                <ul className='hidden md:flex items-center justify-center'>
                    <Link href='/'>
                        <li className='ml-10 text-sm font-CodecProBold text-slate-100 uppercase hover:text-blue-400 '>
                            HOME
                        </li>
                    </Link>
                    <Link href='/#oportunity'>
                        <li className='ml-10 text-sm font-CodecProBold text-slate-100 uppercase hover:text-blue-400 '>
                            Keuntungan
                        </li>
                    </Link>
                    <Link href='#membership' className='rounded-full bg-slate-100 hover:bg-blue-400 ml-10'>
                        <li className={cn('text-sm text-black uppercase px-8 py-2',button.className)}>
                            Daftar
                        </li>
                    </Link>
                </ul>
                <ul className='md:hidden flex items-center justify-center'>
                    <Link href='#membership' className='rounded-full bg-slate-100 hover:bg-blue-400 ml-10'>
                        <li className={cn('text-sm text-black uppercase px-8 py-2',button.className)}>
                            Daftar
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;