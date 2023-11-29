//utils
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Head from 'next/head';

//styles 
import styles from './styles.module.scss'


//icons


//components
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Brand from '@/components/Brand'
import Menu from '@/components/Menu'
import { HTMLAttributes, ReactNode } from 'react';

//interfaces
interface LayoutPortfolioProps extends HTMLAttributes<HTMLDivElement>{
    children : ReactNode, 
    className? : string,
}

const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })

export default function LayoutPortfolio({children, className, ...rest} : LayoutPortfolioProps){
    const {query} = useRouter()
    const id = query?.id
    return (

        <>


        <Head>
            <title>Dev Profile - joaozerofive</title>
        </Head>
        
<div className={`${styles.page} ${roboto.className} ${className}`}>


        <Brand className={styles.brand}/>

        
            {children}

        

        <Menu  />

        <Footer />


</div>


        </>
    )
}