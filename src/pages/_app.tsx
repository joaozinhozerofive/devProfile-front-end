import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '@/hook/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next'
import { api } from '@/services/api'





export default function App({ Component, pageProps, }: AppProps) {
  return (


    <>
    <AuthProvider>

        <Head>
          <link rel="icon" href="/devIcon.png"  />
        </Head>

        <ToastContainer theme='dark' autoClose = {1000} />
        
        <Component {...pageProps} />


    </AuthProvider>
    </>
  )
}



