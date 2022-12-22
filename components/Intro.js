import React from 'react'
import Image from 'next/image'

const Intro = () => {
    return (
        <div className='flex flex-col sm:flex-row lg:flex-col gap-4 lg:max-w-[250px]'>
            <Image
                src='/serey.png'
                alt="serey's headshot"
                height={100}
                width={100}
                priority
                quality={100}
                className='rounded-full'
            />
            <div className='flex flex-col'>
                <h3 className='font-bold text-3xl my-2'>Hello, I'm Serey!</h3>
                <p className='text-md row-start-2'>
                    Welcome to my corner. This is where I share my portfolio, my thoughts
                    and everthing that I'm obsessed with at the moment.
                </p>
            </div>
        </div>

    )
}

export default Intro