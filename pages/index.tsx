import Head from 'next/head';

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import { Post, CONTENTFUL_URL } from '../lib';

interface Props {
    posts: Post[];
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

export async function getServerSideProps() {
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
