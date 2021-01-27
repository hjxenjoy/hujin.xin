declare interface Post {
  title: string
  slug: string
  date: string
  tag: string
  tags: string[]
  content: string
}

declare module 'remark-html'
declare module 'remark-external-links'
declare module 'remark-highlight.js'
