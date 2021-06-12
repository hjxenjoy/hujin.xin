import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { googleTagId } from '../constants'

import '@fontsource/baloo-2'
import '@fontsource/mononoki'
import '@fontsource/roboto'

import '../styles/index.css'

const googleTags = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');
`

const isProd = process.env.NODE_ENV === 'production'

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    function handleRouteChange(url: string) {
      if (isProd && typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('config', googleTagId, { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
  }, [router])

  return (
    <>
      <Head>
        <link rel="icon" href={'/favicon.ico'} />
        <meta name="viewport" content="width=device-width, viewport-fit=cover" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500&family=Roboto:ital,wght@0,400;0,500;1,400&family=Ubuntu+Mono&display=swap"
          rel="stylesheet"
        />
        {isProd && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-8PJWP7DTV9" />
            <script dangerouslySetInnerHTML={{ __html: googleTags }} />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
