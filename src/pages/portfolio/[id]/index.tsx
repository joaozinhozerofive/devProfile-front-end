//utils
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Head from 'next/head';

//styles 
import styles from './styles.module.scss'


//icons
import { FiEdit2 } from "react-icons/fi";


//components
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Brand from '@/components/Brand'
import Menu from '@/components/Menu'

const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })

export default function Portfolio(){
    const {query} = useRouter()
    const id = query?.id
    return (

        <>


        <Head>
            <title>Dev Profile - joaozerofive</title>
        </Head>
        
<div className={`${styles.page} ${roboto.className}`}>


        <Brand className={styles.brand}/>

        

        <main>


            <h1>Olá, <br /> meu nome é João, <br /> Desenvolvedor Web Full Stack</h1>
            <p>Web Developer Full Stack</p>




            <Button
            className={styles.button}
            isLoading = {false}
            title='Fale comigo!'
            />

        </main>


        <Menu  />

        <Footer />


</div>


        </>
    )
}