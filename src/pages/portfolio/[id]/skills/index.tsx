//utils 
import { useRouter } from 'next/router'

//styles
import styles from './styles.module.scss'

//icons
import { IoArrowBackSharp } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";


//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import ButtonText from '@/components/ButtonText';
import TextShadow from '@/components/TextShadow';
import Carousel from '@/components/Carousel';

//fonts 




export default function Skills(){
    const routes = useRouter();
    const {id}   = routes.query as { id : string | number}


    function handleBack(){
        routes.back()
    }


    return(

        <LayoutPortfolio className={styles.layout}>

            <main>
            <ButtonText
            onClick={() => {handleBack()}}
            icon={IoArrowBackSharp}
            title='Voltar'
             />

             <div className={styles.content}>

            <div>
                <TextShadow
                className={styles.h1}
                title='Tecnologias' />
                <ul>
                    <li>html</li>
                    <li>css</li>
                    <li>sass</li>
                    <li>styled - components</li>
                    <li>javascript</li>
                    <li>typescript</li>
                    <li>nodejs</li>
                    <li>nextjs</li>
                    <li>reactjs</li>
                    <li>sql</li>
                    <li>postgresql</li>
                    <li>mongo db </li>
                    <li>knex </li>
                    <li>prisma</li>
                </ul>
            </div>

            <div>
                <TextShadow
                className={styles.h1}
                title='Projetos'/>

                


            <Carousel />

            </div>


             </div>

            </main>
        </LayoutPortfolio>
       
    )
}
