export interface ImageItem {
    title: string,
    url: string,
    description: string,
}

export interface Post {
    id: string,
    title: string,
    firstPublishedAt: string,
    author: string;
    images: ImageItem[],
}

export interface PostWithDescription extends Post {
    description: any;
}

export const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`
