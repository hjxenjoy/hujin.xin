import React from 'react'
import App, { AppProps } from 'next/app'
import { googleTrackingId } from '../constants'

import '../styles/index.css'

const isProd = process.env.NODE_ENV === 'production'

export default class MyApp extends App<AppProps> {
  componentDidMount() {
    const { router } = this.props
    function handleRouteChange(url: string) {
      if (isProd && typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('config', googleTrackingId, { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
