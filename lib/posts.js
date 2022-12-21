import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/i, '');

        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const metaData = matter(fileContent);

        return {
            id,
            ...metaData.data,
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else if (a.date > b.date) {
            return -1;
        } else {
            return 0;
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => ({
        params: {
            id: fileName.replace(/\.md$/i, ''),
        }
    }))
}

export async function getPostData(id) {
    const filePath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const metaData = matter(fileContent);
    const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(metaData.content);

    const contentHTML = processedContent.toString();
    console.log(contentHTML)
    
    return {
        id,
        contentHTML,
        ...metaData.data,
    }
}