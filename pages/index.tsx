import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../components/Layout';

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`

interface ImageItem {
    title: string,
    url: string,
    description: string,
}

interface Post {
    id: string,
    title: string,
    firstPublishedAt: string,
    author: string,
    images: ImageItem[],
}

interface Props {
    posts: Post[]
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

export default function Home({ posts }: Props) {
    return (
        <Layout mainPage>
            <Head>
                <title>Serey's Thoughts</title>
            </Head>
            <div className='h-full overflow-auto flex flex-col gap-4'>
                <div className='lg:sticky lg:top-0 bg-amber-300 drop-shadow-md
                p-4 rounded-t-lg rounded-b-xl text-center lg:text-left z-[5]
                text-white shadow-amber-100'>
                    <h1 className='font-bold text-3xl lg:text-5xl'>Serey's Thoughts</h1>
                </div>
                <Posts posts={posts} />
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const collectionQuery = JSON.stringify({
        query: `{
            blogPostCollection {
                items {
                    sys {
                        id,
                        firstPublishedAt,
                    }
                    title,
                    author, 
                    imagesCollection {
                        items {
                            title,
                            url,
                            description
                        }
                    }
                }
            }
        }`
    });

    const blogEntries = await fetch(
        CONTENTFUL_URL, 
        {
            method: 'POST',
            body: collectionQuery,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`
            }
        }
    )
    .then(response => response.json())
    .then(response => response.data.blogPostCollection.items);

    const posts = blogEntries.map((entry: any) => ({
        id: entry.sys.id,
        firstPublishedAt: entry.sys.firstPublishedAt,
        title: entry.title,
        author: entry.author,
        images: entry.imagesCollection.items,
    }))

    return {
        props: {
            posts,
        }
    }
}
