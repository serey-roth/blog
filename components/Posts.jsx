import Link from "next/link";

import { getSortedPostsData } from "../lib/posts"

const Posts = ({ posts }) => {
    return (
        <>
            <section>
                {posts.map(({ id, title, date }) => (
                    <Link href={`/posts/${id}`}>
                        <p>{title}</p>
                        <br />
                        <p>{date}</p>
                    </Link>
                ))}
            </section>
        </>
    )
}



export default Posts