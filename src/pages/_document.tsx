import Document, { Html, Head, Main, NextScript } from 'next/document'
import PageFooter from '../components/PageFooter'
import { googleTagId } from '../constants'

const googleTags = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');
`

const isProd = process.env.NODE_ENV === 'production'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  /* eslint-disable react/no-danger */
  render() {
    return (
      <Html lang="zh-cmn-Hans">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500&family=Roboto:ital,wght@0,400;0,500;1,400&family=Ubuntu+Mono&display=swap"
            rel="stylesheet"
          />
          {isProd && (
            <>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-8PJWP7DTV9"
              />
              <script dangerouslySetInnerHTML={{ __html: googleTags }} />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          <PageFooter />
        </body>
      </Html>
    )
    /* eslint-enable react/no-danger */
  }
}
