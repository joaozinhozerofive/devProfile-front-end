//utils 
import Head from 'next/head';
import { useRouter } from 'next/router';

//fonts 
import {Mulish} from 'next/font/google'

//styles 
import styles from './styles.module.scss'


//components
import LayoutPortfolio from '@/components/Layout Portfolio';
import ButtonText from '@/components/ButtonText';
import TextShadow from '@/components/TextShadow';


//icons 
import { IoArrowBackSharp } from "react-icons/io5";



const mulish = Mulish({
    weight : ['400'], 
    style : ['normal'], 
    subsets : ['latin']
})


export default function About(){
    const routes = useRouter();
    const {id}   = routes.query as { id : string | number}



    function handleBack(){
        routes.back()
    }


    return (

<LayoutPortfolio className={styles.layout}>
        <main>

            <ButtonText
            onClick={() => {handleBack()}}
            icon={IoArrowBackSharp}
             title='Voltar'/>

            <div className={styles.content}>

            <TextShadow 
            className={styles.h1}
            title='Conheça um pouco sobre João Vitor Machado '/>


            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            </div>    

        </main>

 </LayoutPortfolio>
        
    )
}


