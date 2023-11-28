//utils 
import Head from 'next/head';


//styles 
import styles from './styles.module.scss'


//components
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/router';


export default function About(){
    const routes = useRouter();
    const {id}   = routes.query as { id : string | number}


    return (
        <>
        
            
        <div className={styles.page}>


        <main>

             <Link href={`/portfolio/${id}`}> Voltar uma pagina </Link>

        </main>


        <Footer />

        </div>


        </>
    )
}