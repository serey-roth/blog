import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { BiInfoCircle, BiHomeHeart, BiMenu } from 'react-icons/bi'
import { SiMicrodotblog } from 'react-icons/si'
import { IoMdClose } from 'react-icons/io' 

const Navbar = () => {
    const [menu, setMenu] = useState(true);

    const handleToggleMenu = () => {
        setMenu(prevState => !prevState);
    }

    return (
        <div className='flex flex-col lg:max-w-[250px]'>
            <div className='flex flex-col pt-4 sm:flex-row lg:flex-col gap-4 lg:flex-1'>
                <Image
                    src='/serey.png'
                    alt="serey's headshot"
                    height={100}
                    width={100}
                    priority
                    quality={100}
                    className='rounded-full row-span-2'
                />
                <div className='flex flex-col'>
                    <h3 className='font-bold text-3xl my-2'>Hello, I'm Serey!</h3>
                    <p className='text-md row-start-2'>
                        Welcome to my corner. This is where I share my portfolio, my thoughts
                        and everthing that I'm obsessed with at the moment. 
                    </p>
                </div>
                {menu ? 
                (<IoMdClose 
                    size={30} 
                    className='fixed right-1 top-1 cursor-pointer lg:hidden z-20'
                    onClick={handleToggleMenu}
                    />)
                : 
                (<BiMenu 
                    size={30} 
                    className='fixed right-1 top-1 cursor-pointer lg:hidden z-20'
                    onClick={handleToggleMenu}
                    />)
                }
            </div>

            <div className={`fixed transition-[height] ease-in-out duration-100 z-10
            will-change-transform inset-x-0 lg:bg-inherit lg:h-0 bg-blend-overlay
            ${menu ? 'h-screen bg-black/70' : 'h-0'}`}/>

            <nav className={`flex flex-col items-start gap-3 will-change-transform
            z-10 fixed inset-x-0 px-4 lg:px-0 lg:pt-0 lg:pb-4 lg:relative lg:bg-inherit lg:h-auto
            ${menu ? 'py-6 h-[200px] bg-rose-300' : 'hidden lg:flex'}`}>
                <h1 className='font-bold text-2xl lg:hidden'>Serey's Corner</h1>
                <Link 
                    className='flex items-center gap-2 hover:text-white transition-colors'
                    href='/'>
                    <BiHomeHeart size={25} />
                    <p>Home</p>
                </Link>
                <Link 
                    className='flex items-center gap-2 hover:text-white transition-colors'
                    href='/about'>
                    <BiInfoCircle size={25} />
                    <p>About</p>
                </Link>
                <Link 
                    className='flex items-center gap-2 hover:text-white transition-colors'
                    href='/blog'>
                    <SiMicrodotblog size={25} />
                    <p>Blog</p>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar