import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'

import PageHeader from '../../components/PageHeader'
import PostHeader from '../../components/PostHeader'
import PostBody from '../../components/PostContent'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/md2html'
import { title, description, keywords } from '../../constants'

interface Props {
  post: Post
}

export default function Post({ post }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return router.isFallback ? (
    <div>Loading…</div>
  ) : (
    <>
      <Head>
        <title>
          {post.title} | {title}
        </title>
        <meta name="description" content={`${post.title} | ${description}`} />
        <meta name="keywords" content={`${post.tags.join(',')},${keywords}`} />
      </Head>
      <PageHeader />
      <article className="mx-auto max-w-screen-md px-4 pb-8">
        <PostHeader {...post} />
        <PostBody content={post.content} />
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { post } = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'tags',
    'content',
  ])

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map(({ post }) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
