import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles: {
    global: props => ({
      body: {
        fontFamily:
          '"Baloo 2",Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
        paddingBottom: 'env(safe-area-inset-bottom)',
        color: props.colorMode === 'dark' ? 'gray.200' : 'teal.800',
      },
      article: {
        h1: {
          fontSize: '2xl',
        },
        h2: {
          marginTop: 4,
          marginBottom: 2,
          fontSize: 'xl',
          fontWeight: 'semibold',

          _before: {
            content: '"§"',
            marginRight: 1,
            fontWeight: 'normal',
            color: 'gray.500',
          },
        },
        h3: {
          my: 2,
          fontSize: 'lg',
          fontWeight: 'medium',
        },
        h4: {
          fontSize: 'md',
        },
        h5: {
          fontSize: 'md',
        },

        ul: {
          ul: {
            marginLeft: 8,
          },
        },
        ol: {
          ol: {
            marginLeft: 8,
          },
        },
        li: {
          marginBottom: 1,
        },

        a: {
          color: 'orange.500',
          textDecoration: 'underline',
        },

        img: {
          maxWidth: 'full',
          maxHeight: 'full',
        },

        blockquote: {
          marginTop: 2,
          backgroundColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          padding: 2,
          paddingLeft: 4,
          borderRadius: 4,
          borderLeftWidth: 4,
          borderLeftColor: 'gray.500',
        },

        hr: {
          my: 4,
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        },

        table: {
          marginTop: 2,
          width: 'full',
          borderCollapse: 'collapse',
        },
        tr: {
          borderBottomWidth: 1,
          borderBottomColor: 'gray.200',
        },
        th: {
          px: 2,
          py: 1,
          textAlign: 'left',
        },
        td: {
          px: 2,
          py: 1,
        },
        p: {
          marginTop: 2,
        },
        code: {
          fontFamily: 'Mononoki',
          color: props.colorMode === 'dark' ? 'purple.300' : 'purple.500',
          mx: 1,
          _before: {
            content: '"`"',
          },
          _after: {
            content: '"`"',
          },
        },
        pre: {
          marginTop: 4,
          borderRadius: 4,
          fontFamily: 'Mononoki',
          borderTopWidth: 2,
          borderTopColor: 'orange.200',
          overflowX: 'auto',
          p: 4,
          backgroundColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          code: {
            margin: 0,
            color: 'inherit',
            _before: {
              display: 'none',
            },
            _after: {
              display: 'none',
            },
          },
        },
        '.highlight-js-string': {
          color: 'green.500',
        },
        '.highlight-js-built_in': {
          color: 'cyan.500',
        },
        '.highlight-js-keyword': {
          color: props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        '.highlight-js-selector-tag': {
          color: props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        '.highlight-js-literal': {
          color: props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        '.highlight-js-section': {
          color: props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        '.highlight-js-link': {
          color: props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        '.highlight-js-function': {
          '.highlight-js-keyword': {
            color: props.colorMode === 'dark' ? 'blue.300' : 'blue.500',
          },
        },
        '.highlight-js': {
          color: 'red.300',
        },
        '.highlight-js-subst': {
          color: 'red.300',
        },
        '.highlight-js-title': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-name': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-type': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-attribute': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-symbol': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-bullet': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-addition': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-variable': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-template-tag': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-template-variable': {
          color: props.colorMode === 'dark' ? 'yellow.300' : 'yellow.500',
        },
        '.highlight-js-comment': {
          color: 'gray.500',
        },
        '.highlight-js-quote': {
          color: 'gray.500',
        },
        '.highlight-js-deletion': {
          color: 'gray.500',
        },
        '.highlight-js-meta': {
          color: 'gray.500',
        },
        '.highlight-js-attr': {
          color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
        },
      },
    }),
  },
})

export default theme
