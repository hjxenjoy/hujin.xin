import Document, { Html, Head, Main, NextScript } from 'next/document'
import PageFooter from '../components/PageFooter'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-cmn-Hans">
        <Head />
        <body className="min-h-screen bg-gradient-to-br from-teal-900 to-indigo-900 bg-no-repeat bg-cover antialiased text-teal-300">
          <Main />
          <NextScript />
          <PageFooter />
        </body>
      </Html>
    )
  }
}
