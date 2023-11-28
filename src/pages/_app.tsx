import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import Head from 'next/head'

import Footer from '@/components/Footer'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      
      <Component {...pageProps} />
    </>
  )
}
