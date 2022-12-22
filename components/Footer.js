import React from 'react'
import Link from 'next/link'

import { FaFacebook, FaGithub, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row lg:flex-wrap
        md:items-center md:justify-between w-full py-2
        lg:fixed lg:bottom-2 lg:max-w-[250px] z-10'>
            <p>2022 Serey's Corner. All Rights Reserved.</p>
            <div className='flex items-center gap-2 mt-2'>
                <Link href='https://www.facebook.com/ratanak.serey/'>
                    <FaFacebook size={25} className='text-amber-600' />
                </Link>
                <Link href='https://github.com/serey-roth'>
                    <FaGithub size={25} className='text-amber-600' />
                </Link>
                <Link href='https://www.linkedin.com/in/serey-roth/'>
                    <FaLinkedin size={25} className='text-amber-600' />
                </Link>
            </div>
        </div>
    )
}

export default Footer