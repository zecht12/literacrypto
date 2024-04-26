"use client";

import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { AiOutlineMenu } from "react-icons/ai"
import { useCurrentUser } from '../../hooks/use-current-user';
import { logout } from '../../actions/logout';
import { Button } from '../ui/button';
import Avatar from './avatar';
import { Poppins } from 'next/font/google';
import { cn } from '../../lib/utils';

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

const AdminNavbar = () => {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className=" fixed w-full bg-transparent h-20 z-[100]">
            <div className='flex justify-between items-center w-full h-full px-6 2xl:px-16 '>
                <div className='flex items-center justify-start'>
                    <Link href="/admin" className='flex items-center gap-3'>
                        <Image src="/images/logo.png" alt="image" width={40} height={40} className='rounded-full' />
                        <p className={cn( "text-white md:text-2xl", font.className,)}>
                            LiteraCrypto
                        </p>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='gap-3 p-2 md:py-1 md:px-2 border-[1px] border-slate-100 rounded-full bg-white flex justify-around items-center shadow-sm shadow-neutral-500'>
                        <Avatar src={user?.image} />
                        <div className="relative">
                            <AiOutlineMenu size={25} onClick={toggleMenu} className="text-black hover:text-blue-600 cursor-pointer" />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 flex flex-col justify-center items-center">
                                    {user?.role === "ADMIN" &&(
                                        <>
                                            <Button asChild variant="link" size="sm">
                                                <Link href="#chart">
                                                    Chart
                                                </Link>
                                            </Button>
                                            <Button asChild variant="link" size="sm">
                                                <Link href="#user">
                                                    User
                                                </Link>
                                            </Button>
                                            <Button asChild variant="link" size="sm">
                                                <Link href="#transaction">
                                                    Transaction
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                    <Button asChild variant="link" size="sm">
                                        <button type="submit" onClick={onClick}>
                                            Sign Out
                                        </button>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar;