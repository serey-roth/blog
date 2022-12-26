import { useState, useEffect } from 'react';
import NextImage from 'next/image';

enum Status {
    Pending,
    Success,
    Failure
} 

interface Props {
    height: number;
    width: number;
    src: string;
    alt: string;
    classes: string;
}

const LoadedImage = ({ height, src, alt, width, classes }: Props) => {
    const [status, setStatus] = useState<Status>(Status.Pending);
    const [image, setImage] = useState<HTMLImageElement>();
    
    useEffect(() => {
        const image = new Image();
        image.onload = () => setStatus(Status.Success)
        image.onerror = () => setStatus(Status.Failure)
        image.src = src;
        setImage(image)
    }, [src])
    

    return (
        <>
            {status === Status.Success && image ? (
                <NextImage
                src={image.src}
                alt={alt} 
                height={height}
                width={width}
                quality={100}
                priority
                className={classes}
                />                
            ) : (
                <div className='animate-pulse bg-gray-400 rounded-lg h-[500px] w-full' />
            )}
        </>
    )
}

export default LoadedImage