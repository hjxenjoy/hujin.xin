import React from 'react'

interface Props {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    // eslint-disable-next-line react/no-danger
    <div
      className="prose prose-yellow w-full max-w-full text-teal-900"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
