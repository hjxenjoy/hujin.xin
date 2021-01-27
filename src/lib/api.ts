import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { parseISO } from 'date-fns'

const postsDirectory = path.resolve(process.cwd(), 'src', '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: (keyof Post)[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.resolve(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post: Partial<Post> = {}

  fields.forEach(field => {
    if (field === 'slug') {
      post[field] = realSlug
    }
    if (field === 'content') {
      post[field] = content
    }

    if (field === 'tags') {
      post[field] = (data.tag || '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    }

    if (data[field]) {
      post[field] = data[field]
    }
  })

  const date = parseISO(data.date).getTime()

  return {
    post,
    date,
  }
}

export function getAllPosts(fields: (keyof Post)[] = []) {
  const slugs = getPostSlugs()

  return slugs
    .map(slug => getPostBySlug(slug, fields))
    .sort((a, b) => b.date - a.date)
}
