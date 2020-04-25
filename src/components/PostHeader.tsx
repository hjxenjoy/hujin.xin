import React from 'react'
import DateFormater from './DateFormatter'

interface Props {
  title: string
  date: string
  tags: string[]
}

export default function PostHeader({ title, date, tags }: Props) {
  return (
    <>
      <h1 className="post-title">{title}</h1>
      <div className="post-profile">
        <DateFormater dateString={date} />
        {tags.map(tag => (
          <span className="post-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}
