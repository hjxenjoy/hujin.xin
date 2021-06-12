import React from 'react'
import { Box, useColorModeValue, Text } from '@chakra-ui/react'

export default function PageFooter() {
  const year = new Date().getFullYear()
  const color = useColorModeValue('teal.600', 'gray.300')
  return (
    <Box as="footer" p={8} color={color} textAlign="center">
      <Text as="p">to be a better man.</Text>
      <Text mt={2}>&copy;&nbsp;{year}&nbsp;Jinxin Hu.</Text>
    </Box>
  )
}
