//utils
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Head from 'next/head';
import { HTMLAttributes, ReactNode } from 'react';

//styles 
import styles from './styles.module.scss'

//assets
import logotipoWhatsApp from '../../../public/logoWhatsApp.png'

//icons
import { IoArrowBackSharp } from "react-icons/io5";

//components
import Footer from '@/components/Footer'
import Brand from '@/components/Brand'
import Menu from '@/components/Menu'
import Image from 'next/image';
import ButtonText from '../ButtonText';

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
    const routes = useRouter()
    const {id} = routes.query as {id : string}


    return (

        <>


        <Head>
            <title>Dev Profile - joaozerofive</title>
        </Head>
        
<div className={`${styles.layoutContainer} ${roboto.className} ${className}`}>



        <Brand className={styles.brand}/>


        <main>

            <ButtonText
            onClick={() => routes.back()}
            icon={IoArrowBackSharp}
             title='Voltar'/>
            {children}

            <Image
            className={styles.logotipoWhats}
             src={logotipoWhatsApp} 
             alt='ogotipo WhatsApp'/>
        </main>
        

        <Menu  />


        

        <Footer />


</div>


        </>
    )
}