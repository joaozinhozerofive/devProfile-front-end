//utils
import {useState} from 'react'
import { GetServerSideProps } from 'next';
import { api } from '@/services/api';
import {toast} from 'react-toastify'
//styles
import styles from './styles.module.scss'
//components
import Input from '@/components/Input'
import LayoutPortfolio from '@/components/Layout Portfolio'
import ButtonText from '@/components/Button'
import Button from '@/components/Button'
import TextShadow from '@/components/TextShadow'
import Form from '@/components/Form';
//icons
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from 'react-icons/ci';
import { GrGithub } from 'react-icons/gr';
import { AiOutlineMail } from "react-icons/ai";
//fonts 
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';




interface ContactsProps{
    id : number
    user_id: string
    whatsappData : string
    linkedinData : string 
    githubData : string 
    emailData : string
}









export default function Edit({whatsappData, linkedinData, githubData, emailData }){
    const [whatsapp, setWhatsapp] = useState<string>(whatsappData)
    const [linkedin, setLinkedin] = useState<string>(linkedinData)
    const [github, setGithub] = useState<string>(githubData)
    const [email, setEmail]  = useState<string>(emailData)

    const [buttonLoading, setButtonLoading] = useState(false)
    
    const routes = useRouter()
    const {id} = routes.query as {id : string | number}



    async function handleUpdateContacts(){
        setButtonLoading(true)

        try{

            await api.put("/contacts", {whatsapp, linkedin, github, email})

            toast.success("Contatos atualizados com sucesso")

            routes.push(`/portfolio/${id}/edit/about`)
        }catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
        }finally{

        setButtonLoading(false)
            
        }
    }

    
    return(

<LayoutPortfolio>
        <div className={styles.content}>

                <TextShadow 
                className={styles.textShadow} 
                title='Editar - Contato' />

                
                <Form className={styles.formEdit}>

                    <label>

                        WhatsApp



                        <Input
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        icon={FaWhatsapp}
                        placeholder='https://wa.me/(seu número de WhatsApp)'
                        className={styles.input}
                         type='text' />

                    </label>

                    <label>

                        Linkedin
                        <Input
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        icon={CiLinkedin}
                        placeholder='https://www.linkedin.com/in/usuario-9674541a3/'
                        className={styles.input}
                        type='text' />

                    </label>

                    <label>

                        Github
                        <Input
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        icon={GrGithub}
                        placeholder='https://github.com/(seu nome de usuário)'
                        className={styles.input}
                        type='text' />

                    </label>

                    <label>

                        Email
                        <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={AiOutlineMail}
                        placeholder='Link e-mail de uso: '
                        className={styles.input}
                        type='text' />
                    </label>

                </Form>

                <Button 
                isLoading = {buttonLoading}
                onClick={ () => handleUpdateContacts()}
                title='Próximo' />
            </div>

</LayoutPortfolio>           

    )
}


export const getServerSideProps: GetServerSideProps<ContactsProps> = async (ctx) => {
        try{
            const {id} = ctx.query;
            const response = await api.get(`/contacts/${id}`)
            const data = response.data


            return{
                props : {
                    id : data.id || '',
                    user_id : data.user_id || '',
                    whatsappData : data.whatsapp || '',
                    linkedinData : data.linkedin || '' ,
                    githubData : data.github || '' ,
                    emailData : data.email || '',

                }
            };
        }catch(error){
            console.log(error)
            
            return { 
                props : {
                    id : '',
                    user_id :'',
                    whatsappData : '',
                    linkedinData : '',
                    githubData : '',
                    emailData : '',
                }
            }
        }
  };







