import { Montserrat, Poppins } from 'next/font/google';
import React from 'react'
import { cn } from '../../lib/utils';

const body = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
});

const Footer = () => {
    return (
        <div>
            <div className='w-auto h-auto bg-black'>
                <div className='flex w-full h-full p-2 justify-center'>
                    <p className={cn('font-bold text-slate-100', body.className)}>Copyright @ 2024 LiteraCrypto</p>
                </div>
            </div>
        </div>
    )
}

export default Footer