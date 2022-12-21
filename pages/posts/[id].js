import React from 'react'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../../components/Layout'
import Head from 'next/head'

const Post = ({ post }) => {
    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article className='flex flex-col gap-2 p-2'>
                <h1 className='text-3xl font-bold mt-1'>{post.title}</h1>
                <p className='text-lg'>{post.date}</p>
                <br />
                <div className='text-xl' dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            post: postData,
        }
    }
} 

export default Post