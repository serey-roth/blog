import React from 'react'
import Image from 'next/image'

const Intro = () => {
    return (
        <div className='flex flex-col sm:flex-row lg:flex-col gap-4 lg:max-w-[250px]'>
            <Image
                src='/serey.png'
                alt="headshot"
                height={100}
                width={100}
                priority
                quality={100}
                className='rounded-full'
            />
            <div className='flex flex-col'>
                <h3 className='font-bold text-3xl my-2'>Hello, I&apos;m Serey!</h3>
                <p className='text-md row-start-2'>
                    Welcome to my corner. This is where I share my thoughts
                    and everything that I am obsessed with at the moment.
                </p>
            </div>
        </div>

    )
}

export default Intro