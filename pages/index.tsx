import Head from 'next/head'
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

import Layout from '../components/Layout';

interface HomeProps {
    posts: [{
        id: string,
        title: string,
        date: string 
        description: string,
    }]
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
                    {posts.map(({ id, title, date, description }) => (
                        <Link key={id} href={`/posts/${id}`}>
                            <div className='border p-2 rounded-lg drop-shadow-sm flex flex-col
                            shadow-sm shadow-gray-100'>
                                <h3 className='font-semibold'>{title}</h3>
                                <p className='text-sm mb-2'>{date}</p>
                                <small>
                                    <p>
                                        {description}
                                    </p>
                                </small>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData(); 
    return { 
        props: {
            posts: allPostsData,
        }
    }
}
