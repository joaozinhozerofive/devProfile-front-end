//utils
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Head from 'next/head';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio';

const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


interface ContactsProps{
    id : number
    user_id: string
    whatsapp : string
    linkedin : string 
    githubD : string 
    email : string
}

interface UserProps{
    id:  number
    name : string
    email : string
    ocupation : string
}


interface PorfolioProps{
    id : string | string[]
}

export default function Portfolio({id} :  PorfolioProps ){
    const routes = useRouter();
    const [user, setUser] =  useState<UserProps>()
    const [contacts, setContacts] = useState<ContactsProps>()


    useEffect(() => {
        async function  fetchContacts(){

            try{
                const contactsResponse = await api.get(`/contacts/${id}`)
                const contactsData = contactsResponse.data
        
                
                setContacts(contactsData)

            }catch(error){
                    console.log(error)
                
            }


            console.log(id)
   
           
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
   
           }

           if(id){

           fetchUser()

           }

   
       }, [id])


    return (

        <>
        <Head>
            <title>Dev Profile - {user?.name}</title>
        </Head>


<LayoutPortfolio>

        <div className={styles.layout}>


                    <h1>Olá, <br /> meu nome é {user?.name}, <br /> {user?.ocupation}</h1>

                    <p>{user?.ocupation}</p>

                    <a

                    target='_blank'
                    href={contacts?.whatsapp}
                    className={styles.button}
                    >
                        Fale comigo!

                    </a>
        </div>
         
</LayoutPortfolio>        


        </>
    )
}


export const getServerSideProps: GetServerSideProps<PorfolioProps> = async (ctx) => {
    try{
        const {id} = ctx.query;

        return{
            props : {
                
                id :  id.toString() || ''

            }
        };
    }catch(error){
        console.log(error)
        

        return { 
            props : {
                id : ''

            }
        }
    }
};


