import React from 'react'
import Image from 'next/image'
import Head from 'next/head'

import Layout from '../../components/Layout'
import { CONTENTFUL_URL, PostWithDescription } from '../../lib'

interface Props {
    post: PostWithDescription;
}

const Post = ({ post }: Props) => {
    return (
        <Layout mainPage={false}>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article className='flex flex-col gap-4 pt-3 bottom-0 max-w-[1000px]
            relative left-1/2 -translate-x-1/2 leading-relaxed'>
                <div className='w-full flex mb-4'>
                {post.images.map(image => (
                        <Image 
                            src={image.url}
                            alt={image.description}
                            width={300}
                            height={400}
                            priority
                            quality={100}
                            className=' max-h-[500px] w-full aspect-auto origin-bottom'
                            />
                    ))}
                </div>
                <h1 className='text-3xl lg:text-5xl font-bold'>{post.title}</h1>
                <div className='flex sm:flex-row flex-col sm:items-center justify-between'>
                    <p className='text-sm font-semibold'>Written by {post.author}</p>
                    <p className='text-sm'>{(new Date(post.firstPublishedAt)).toDateString()}</p>
                </div>
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
                imagesCollection {
                    items {
                        title,
                        url,
                        description
                    }
                }
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
        images: blogEntryData.imagesCollection.items,
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
                <>
                    <ul className='list-disc'>
                        {getUnorderedListItems(item).map((listItem: string, index: number) => (
                            <li className='ml-8 mb-4' key={`list-item-${index}`}>{listItem}</li>
                        ))}
                    </ul>
                    <br />
                </>
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