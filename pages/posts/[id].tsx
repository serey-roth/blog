import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`

interface PostProps {
    post: {
        id: string,
        firstPublishedAt: string, 
        title: string,
        description: any,
        author: string,
        imageUrl?: string,
    }
}

const Post = ({ post }: PostProps) => {
    return (
        <Layout home={false}>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article className='flex flex-col gap-2 p-2'>
                <h1 className='text-3xl font-bold mt-1'>{post.title}</h1>
                <p className='text-sm font-semibold'>Author: {post.author}</p>
                <p className='text-sm'>Published On: {(new Date(post.firstPublishedAt)).toDateString()}</p>
                <div>
                   {getBlogDescriptionHTML(post.description.content)}
                </div>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const collectionQuery = JSON.stringify({
        query: `{
            blogPostCollection {
                items {
                    sys {
                        id
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

    const paths = blogEntries.map((entry: any) => ({
        params: {
            id: entry.sys.id,
        }
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: any }) {
    const entryQuery = JSON.stringify({
        query: `{
            blogPost(id: "${params.id}") {
                sys {
                    id,
                    firstPublishedAt,
                }
                title,
                description {
                    json
                },
                author,
            }
        }`
    });

    const blogEntryData = await fetch(
        CONTENTFUL_URL, 
        {
            method: 'POST',
            body: entryQuery,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`
            }
        }
    )
    .then(response => response.json())
    .then(response => response.data.blogPost);

    const blogEntry = {
        id: blogEntryData.sys.id,
        firstPublishedAt: blogEntryData.sys.firstPublishedAt,
        title: blogEntryData.title,
        description: blogEntryData.description.json,
        author: blogEntryData.author,
    }

    return {
        props: {
            post: blogEntry,
        }
    }
} 

function getBlogDescriptionHTML(content: any) {
    const children = content.map((item: any) => {
        if (item.nodeType === 'paragraph') {
            return (
                <>
                    <p>{getParagraph(item)}</p>
                    <br />
                </>
            )
        } else if (item.nodeType === 'unordered-list') {
            return (
                <ul>
                    {getUnorderedListItems(item.content).map((listItem: string, index: number) => (
                        <li key={`list-item-${index}`}>{listItem}</li>
                    ))}
                </ul>
            )
        }
    })
    
    return (
        <>
            {children}
        </>
    )
}

function getParagraph(paragraphNode: any) {
    return paragraphNode.content[0].value;
}

function getUnorderedListItems(unorderedListNode: any) {
    return unorderedListNode.content.map((listItem: any) => getParagraph(listItem.content[0]));
}

export default Post