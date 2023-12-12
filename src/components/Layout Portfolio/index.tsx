//utils
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Head from 'next/head';
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
//styles 
import styles from './styles.module.scss'
//icons
import { IoArrowBackSharp } from "react-icons/io5";
//assets
import logotipoWhatsApp from '../../../public/logoWhatsApp.png'


//components
import Footer from '@/components/Footer'
import Brand from '@/components/Brand'
import Menu from '@/components/Menu'
import Image from 'next/image';
import ButtonText from '../ButtonText';
import { GetServerSideProps } from 'next';
import { api } from '@/services/api';
import { seteuid } from 'process';
import { toast } from 'react-toastify';

//interfaces
interface LayoutPortfolioProps extends HTMLAttributes<HTMLDivElement>{
    children : ReactNode, 
    className? : string,

}

interface UserProps{
    name : string
}


interface ContactsProps{
    whatsapp : string
    linkedin : string
    github : string
    email : string
}

const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })

export default function LayoutPortfolio({children, className, ...rest} : LayoutPortfolioProps){
    const [user, setUser] = useState<UserProps>()
    const [contacts, setContacts] = useState<ContactsProps>()

    const routes = useRouter()
    const {id} = routes.query

    console.log(id)


    


    useEffect(() => {
        async function  fetchContacts(){

            try{
                const contactsResponse = await api.get(`/contacts/${id}`)
                const contactsData = contactsResponse.data
        
                
                setContacts(contactsData)

            }catch(error){
                    console.log(error)
                
            }

   
   
           
        }

        if(id){
            fetchContacts()

        }   
   
       }, [id])
       
   
       useEffect(() => {
   
           async function fetchUser() {
   
           const userResponse = await api.get(`/users/${id}`)
           const userData = userResponse.data
   
           setUser(userData)

           console.log("idd: " + id)

   
           }

           if(id){

           fetchUser()

           }

   
       }, [id])
    
    


    return (
        <>

        
        
<div className={`${styles.layoutContainer} ${roboto.className} ${className}`}>



        <Brand 
        contacts={contacts}
        user = {user}
        className={styles.brand}/>


        <main>

            <ButtonText
            onClick={() => routes.back()}
            icon={IoArrowBackSharp}
             title='Voltar'/>


            {children}

         {contacts?.whatsapp ? ( 
            <a
            target='_blank'
             href={contacts?.whatsapp}>

                <Image
                width={0}
                height={0}
                className={styles.logotipoWhats}
                src={logotipoWhatsApp} 
                alt='ogotipo WhatsApp'/>

             </a>

         ) : "" }
            
        </main>
        

        <Menu 
        contacts={contacts}
         />

        <Footer />


</div>


        </>
    )
}

