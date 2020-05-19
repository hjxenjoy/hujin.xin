import React from 'react'
// eslint-disable-next-line no-unused-vars
import App, { AppProps } from 'next/app'
import { googleTrackingId } from '../constants'

const isProd = process.env.NODE_ENV === 'production'

export default class MyApp extends App<AppProps> {
  componentDidMount() {
    const { router } = this.props
    function handleRouteChange(url: string) {
      /* eslint-disable no-undef */
      if (isProd && typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('config', googleTrackingId, { page_path: url })
      }
      /* eslint-enable no-undef */
    }
    router.events.on('routeChangeComplete', handleRouteChange)
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
