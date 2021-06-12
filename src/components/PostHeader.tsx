import React from 'react'
import DateFormatter from './DateFormatter'

interface Props {
  title: string
  date: string
  tags: string[]
}

export default function PostHeader({ title, date, tags }: Props) {
  return (
    <>
      <h1 className="mb-4 text-2xl text-teal-100">{title}</h1>
      <div className="mb-4 pb-2 border-b border-teal-600">
        <DateFormatter dateString={date} />
        {tags.map(tag => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}
