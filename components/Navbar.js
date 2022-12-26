import React from 'react'
import Link from 'next/link'

import { BiHomeHeart } from 'react-icons/bi'

const Navbar = ({ open }) => {
    return (
        <>
            <div className={`fixed top-0 transition-[height] ease-in-out duration-100 z-10
            will-change-transform inset-x-0 lg:bg-inherit lg:h-0
            ${open ? 'h-screen bg-black/70' : 'h-0'}`}/>

            <nav className={`flex flex-col items-start gap-3 will-change-transform
            z-10 fixed lg:top-[19rem] ${open ? `py-6 h-fit bg-amber-300 rounded-b-[10%] inset-x-0 
            lg:inset-x-auto px-4 lg:px-0 lg:bg-transparent lg:h-auto lg:py-0` : 'hidden lg:flex'}`}>
                <h1 className='font-bold text-2xl lg:hidden'>Serey&apos;s Corner</h1>
                <Link 
                    className='flex items-center gap-2 hover:text-gray-400 transition-colors'
                    href='/'>
                    <BiHomeHeart size={25} />
                    <p>Home</p>
                </Link>
            </nav>
        </>
    )
}

export default Navbar

