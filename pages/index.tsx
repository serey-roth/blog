import Head from 'next/head'
import Link from 'next/link';

import Layout from '../components/Layout';

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`

interface Post {
    id: string,
    title: string,
    firstPublishedAt: string,
    author: string,
}

interface HomeProps {
    posts: Post[]
}

export default function Home({ posts }: HomeProps) {
    return (
        <Layout home>
            <Head>
                <title>Serey's Blog</title>
            </Head>
            <section className='flex flex-col gap-2 items-center'>
                <h1 className='font-bold text-3xl'>Serey's Blog</h1>
                <div className='flex flex-col gap-2 max-w-[1000px]'>
                    {posts.map(({ id, title, firstPublishedAt, author }) => (
                        <Link key={id} href={`/posts/${id}`}>
                            <div className='border p-2 rounded-lg drop-shadow-sm flex flex-col
                            shadow-sm shadow-gray-100'>
                                <h3 className='font-semibold mb-4'>{title}</h3>
                                <p className='text-sm'>By: {author}</p>
                                <p className='text-sm'>Published On: {(new Date(firstPublishedAt)).toDateString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
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
                    author
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
    }))

    return {
        props: {
            posts,
        }
    }
}
