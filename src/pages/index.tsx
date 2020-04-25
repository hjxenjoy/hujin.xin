import Link from 'next/link'
import Head from 'next/head'
import PageHeader from '../components/PageHeader'

import '../styles/main.scss'
import { getAllPosts } from '../lib/api'
import DateFormater from '../components/DateFormatter'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>胡金鑫的个人网站</title>
      </Head>
      <PageHeader />
      <main className="container">
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.slug} className="post-entry">
              <Link href={`/posts/${post.slug}`}>
                <a href={`/posts/${post.slug}`}>{post.title}</a>
              </Link>
              <div className="post-infor">
                <DateFormater dateString={post.date} />
                {post.tags.map(tag => (
                  <span className="post-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug', 'tags']).map(
    item => item.post
  )

  return {
    props: { posts },
  }
}
