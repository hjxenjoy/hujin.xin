import { Text, useColorModeValue } from '@chakra-ui/react'

export default function Tag({ children }: { children: string }) {
  const color = useColorModeValue('orange.500', 'orange.200')
  return (
    <Text as="span" color={color} ml={2} _before={{ content: '"\u2022"', marginRight: 1 }}>
      {children}
    </Text>
  )
}
