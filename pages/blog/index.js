import Layout from "../../components/layout"
import styles from './Blog.module.css'
import { getPosts } from '../../lib/posts'
import Link from 'next/link'

export default function BlogIndex(props) {
    console.log(props)

    return (
        <Layout>
            <h1>BlogIndex</h1>
            <ul className={styles.posts}>
                {
                    props.postsData.map(post => (
                        <li key={post.id}>
                        <Link href={`/blog/${post.id}`}><a>{post.title}</a></Link>
                            <br />
                            <small>{post.date}</small>
                        </li>
                    ))
                }
            </ul>
        </Layout>
    )
}

// run on server-side on build-time
export async function getStaticProps() {
    const postsData = getPosts()

    return {
        props: {
            postsData
        }
    }

    // return {
    //     props: {
    //         name: "Lenny",
    //         id: 1
    //     }
    // }
}