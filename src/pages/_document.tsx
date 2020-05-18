import Document, { Html, Head, Main, NextScript } from 'next/document'
import PageFooter from '../components/PageFooter'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="zh-cmn-Hans">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500&family=Roboto:ital,wght@0,400;0,500;1,400&family=Ubuntu+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <PageFooter />
        </body>
      </Html>
    )
  }
}
