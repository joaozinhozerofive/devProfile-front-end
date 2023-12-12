//utils
import { GetServerSideProps } from 'next'
import {useState} from 'react'
import {toast} from 'react-toastify'
import Head from 'next/head'
//styles
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '@/services/api'
import { useAuth } from '@/hook/AuthContext'
import PageError from '@/components/PageError'





interface AboutProps{
     aboutData : string
}



export default function EditAbout({aboutData}){
    const [about, setAbout] = useState<string>(aboutData)
    const [buttonLoading, setButtonLoading] =  useState(false)

    const routes = useRouter()
    const {id}   = routes.query 

    const {user_id} = useAuth();

    const userIdMatched = user_id === Number(id)


    async function handleEditAbout(){
        setButtonLoading(true)



        try{     
            if(!about){
                toast.error("Por favor, preencha o campo sobre você.")
            }
            await api.put("/users", {about})


            toast.success("Usuário atualizado com sucesso.")

            routes.push(`/portfolio/${id}/edit/skills`)

        }catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível editar seus dados")
            }
        }finally{

            setButtonLoading(false)
        }

    }


    if(!userIdMatched){
        
        return (
            PageError
        )
    }


    return(

<>

<Head>
    <title>Dev Profile - Editar sobre </title>
</Head>

<LayoutPortfolio>


            <div className={styles.content}>

                <TextShadow
                className={styles.texshadow}
                title='Editar - Sobre'
                 />

                    <Form className={styles.formEdit}>
                        <h1>Escreva sobre você</h1>
                        <textarea 
                        placeholder='Seja breve...'
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}>
                        </textarea>

                    </Form>

                    <Button 
                    isLoading = {buttonLoading}
                    onClick={ () => handleEditAbout()}
                    title='Próximo' />


            </div>

</LayoutPortfolio>

</>

    )
}


export const getServerSideProps : GetServerSideProps<AboutProps> = async (ctx) =>{

    try{
        const {id} = ctx.query
        const response = await api.get(`/users/${id}`)
        const data = response.data

        return{
            props :{
                aboutData : data.about || ''
            }
        }

    }catch(error){
        console.log(error)


        return{
            props : {
                aboutData : ''
            }
        }
    }
   
}