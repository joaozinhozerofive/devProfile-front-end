//utils 
import Head from 'next/head';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio';
import TextShadow from '@/components/TextShadow';
//icons 
import { IoArrowBackSharp } from "react-icons/io5";
import { GetServerSideProps } from 'next';
//fonts 
import {Mulish} from 'next/font/google'


interface UserProps{
    name : string
    about : string
}


interface AboutProps{
    userData : UserProps
}



const mulish = Mulish({
    weight : ['400'], 
    style : ['normal'], 
    subsets : ['latin']
})


export default function About({userData} : AboutProps){
    const routes = useRouter();



    


    return (
<>

<Head>
    <title>Dev Profile -  Sobre</title>
</Head>


<LayoutPortfolio>

            <div className={styles.content}>

            <TextShadow 
            className={styles.h1}
            title= {`Conheça um pouco sobre ${userData.name}`} />


            <p>
            {userData.about}
            </p>

            </div>   

</LayoutPortfolio>
</>
        
    )
}





export const getServerSideProps : GetServerSideProps<AboutProps> = async (ctx) => {

    try{
        const {id} = ctx.query
        const response = await api.get(`/users/${id}`)
        const data = response.data



        return {

            props : {
                userData : data || ''
            }

        }

    }catch(error){

        console.log("error:" + error)

        return {
            props : {
                userData : ''
            }
        }
    }

}





