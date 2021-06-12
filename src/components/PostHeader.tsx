import React from 'react'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import DateFormatter from './DateFormatter'
import Tag from './Tag'

interface Props {
  title: string
  date: string
  tags: string[]
}

export default function PostHeader({ title, date, tags }: Props) {
  const lineColor = useColorModeValue('teal.500', 'gray.600')

  return (
    <>
      <Heading as="h1" mb={4} fontWeight="medium" fontSize="xl">
        {title}
      </Heading>
      <Box mb={4} pb={2} borderBottomWidth={1} borderBottomColor={lineColor}>
        <DateFormatter dateString={date} />
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Box>
    </>
  )
}
