import React from 'react'

interface Props {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    // eslint-disable-next-line react/no-danger
    <div className="prose w-full max-w-full" dangerouslySetInnerHTML={{ __html: content }} />
  )
}
