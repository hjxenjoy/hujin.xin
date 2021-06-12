import { Text, useColorModeValue } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

export default function DateFormatter({ dateString }: Props) {
  const date = parseISO(dateString)
  const color = useColorModeValue('gray.600', 'gray.300')
  return (
    <Text as="time" dateTime={dateString} fontSize="sm" color={color}>
      {format(date, 'LLLL	d, yyyy')}
    </Text>
  )
}
