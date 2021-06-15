import NextLink from 'next/link'
import Head from 'next/head'
import { Box, ListItem, UnorderedList, useColorModeValue, Link } from '@chakra-ui/react'
import PageHeader from '../components/PageHeader'

import { getAllPosts } from '../lib/api'
import DateFormatter from '../components/DateFormatter'
import { description, title } from '../constants'
import Tag from '../components/Tag'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <PageHeader />
      <Box as="main" mx="auto" px={4} maxWidth="lg">
        <UnorderedList spacing={4} listStyleType="none" mx={0}>
          {posts.map(post => (
            <ListItem
              key={post.slug}
              borderWidth={1}
              borderColor={borderColor}
              borderRadius={4}
              px={4}
              py={3}
            >
              <NextLink href={'/posts/[slug]'} as={`/posts/${post.slug}`}>
                <Link
                  fontWeight="medium"
                  _hover={{ textDecoration: 'underline', color: 'teal.500' }}
                  href={`/posts/${post.slug}`}
                >
                  {post.title}
                </Link>
              </NextLink>
              <Box mt={2}>
                <DateFormatter dateString={post.date} />
                {post.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug', 'tags']).map(item => item.post)

  return {
    props: { posts },
  }
}
