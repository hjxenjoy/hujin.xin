import Document, { Html, Head, Main, NextScript } from 'next/document'

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
          <meta name="description" content="胡金鑫的个人网站，集中前端开发" />
          <meta
            name="keywords"
            content="胡金鑫,个人博客,个人网站,hujin.xin,hjxenjoy,前端开发,JavaScript,css,html,React,Vue"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
