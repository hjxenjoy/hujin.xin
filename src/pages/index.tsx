import Link from 'next/link'
import Head from 'next/head'
import PageHeader from '../components/PageHeader'

import { getAllPosts } from '../lib/api'
import DateFormatter from '../components/DateFormatter'
import { description, keywords, title } from '../constants'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <PageHeader />
      <main className="container">
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.slug} className="post-entry">
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                <a href={`/posts/${post.slug}`}>{post.title}</a>
              </Link>
              <div className="post-info">
                <DateFormatter dateString={post.date} />
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
