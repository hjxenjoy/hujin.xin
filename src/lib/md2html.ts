import remark from 'remark'
import html from 'remark-html'
import externalLinks from 'remark-external-links'
import highlight from 'remark-highlight.js'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // .use(externalLinks, {target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer']})
    .use(externalLinks)
    .use(html)
    .use(highlight)
    .process(markdown)
  return result.toString()
}
