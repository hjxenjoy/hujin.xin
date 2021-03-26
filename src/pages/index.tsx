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
      <main
        className="mx-auto px-4 max-w-screen-sm"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <ul>
          {posts.map(post => (
            <li
              key={post.slug}
              className="mb-4 bg-teal-100 bg-opacity-50 rounded-md p-4"
            >
              <Link href={'/posts/[slug]'} as={`/posts/${post.slug}`}>
                <a
                  className="text-teal-900 font-medium"
                  href={`/posts/${post.slug}`}
                >
                  {post.title}
                </a>
              </Link>
              <div className="mt-2">
                <DateFormatter dateString={post.date} />
                {post.tags.map(tag => (
                  <span className="tag" key={tag}>
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
