import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'

import { Box } from '@chakra-ui/react'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import PostHeader from '../../components/PostHeader'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/md2html'
import { title, description } from '../../constants'

interface Props {
  post: Post
}

export default function Post({ post }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return router.isFallback ? (
    <Box textAlign="center">Loading…</Box>
  ) : (
    <>
      <Head>
        <title>
          {post.title} | {title}
        </title>
        <meta name="description" content={`${post.title} | ${description}`} />
      </Head>
      <PageHeader />
      <Box as="main" mx="auto" maxW="2xl" px={4} pb={8}>
        <PostHeader {...post} />
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { post } = getPostBySlug(params.slug, ['title', 'date', 'slug', 'tags', 'content'])

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
