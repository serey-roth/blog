import Link from "next/link";
import Image from "next/image";

interface Props {
    posts: import("../lib").Post[];
    
}

const Posts = ({ posts }: Props) => {
    return (
        <div className='flex sm:grid sm:grid-cols-2 lg:grid-cols-3 flex-col gap-4 px-2'>
            {posts.map(({ id, title, firstPublishedAt, author, images }) => (
                <Link key={id} href={`/posts/${id}`} className='mb-4'>
                    <div className='flex flex-col gap-2 rounded-xl border relative bg-white drop-shadow-md
                    h-[350px]'>
                        <Image
                            width={250}
                            height={100}
                            src={images[0].url}
                            alt={images[0].description}
                            className='w-full max-h-[200px] object-cover aspect-square rounded-t-xl'
                        />
                        <div className='flex flex-col gap-2 w-full flex-1 p-4'>
                            <h3 className='font-semibold text-xl lg:text-2xl flex-1 mb-4'>{title}</h3>
                            <p className='text-sm'>Written by <strong>{author}</strong></p>
                            <p className='text-sm absolute top-2 invert-[100%] right-4 font-bold'>
                                {(new Date(firstPublishedAt)).toDateString()}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Posts