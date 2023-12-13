//utils 
import { useState } from 'react';
import { useAuth } from '@/hook/AuthContext';
import { toast } from 'react-toastify';
import { api } from '@/services/api';
import Router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import Form from '@/components/Form'
import Input from '@/components/Input'
import Image from 'next/image'
import TextShadow from '@/components/TextShadow';
import Button from '@/components/Button';
import PageError from '@/components/PageError';
//icons
import { MdAddAPhoto } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
//assests
import avatar from '../../../../../public/avatarUrl.png'






interface UsersProps{
    id : string | string[]
    nameData : string
    emailData : string
    ocupationData : string
    imgData : string
}




/* eslint-disable @next/next/no-img-element */

export default function Profile({nameData, emailData, ocupationData, imgData, id}: UsersProps){


    const [name, setName] =  useState<string>(nameData)
    const [email, setEmail] =  useState<string>(emailData)
    const [ocupation, setOcuparion] = useState<string>(ocupationData)
    const [password, setPassword] = useState<string> ("")
    const [old_password, setOld_password] = useState<string> ("")
    const [img, setImg] = useState<File | string | undefined>(imgData)

    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const avatarUrl = img ? `${`${api.defaults.baseURL}/files/${img}`}` : avatar

    const [imagePreview, setImagePreview] = useState(avatarUrl)

    const {user_id} = useAuth()

    //const {id} = useRouter().query;


    const userIdMatched = user_id === Number(id)


    console.log(nameData, emailData, ocupationData, id  )

    async function HandleUpdateProfile(){

        setButtonLoading(true)

        try{
            if(!name ||!email || !ocupation){
                return toast.error("Os 3 primeiros campos são obrigatórios")
            }

            const formData = new FormData()

            formData.append("name", name)
            formData.append("email", email)
            formData.append("ocupation", ocupation)

            if(img){
                formData.append("img", img)
            } 

            if(password){
                formData.append("password", password)
            }

            if(old_password){
                formData.append("old_password",old_password)
            }

            await api.put(`/users`, formData)

            toast.success("Usuário atualizado com sucesso.")

            Router.back()



        }catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível atualizar os dados do seu perfil")  
            }
        }finally{
            setTimeout(() => {
                setButtonLoading(false)
            }, 500)
        }
        
    }


    


    async function HandleChangeImgAvatar(e){
        const file = e.target.files[0]


        setImg(file)

        const imagePreview  = URL.createObjectURL(file)


        setImagePreview(imagePreview)
    }


    if(!userIdMatched){
        return(
            <PageError/>
        )
    }


    return (

<>

<Head>
    <title>Dev Profile - Perfil</title>
</Head>
        <LayoutPortfolio>
        <div className={styles.content}>

        <TextShadow 
        className={styles.textshadow}
        title='Perfil' />


              <Form>

                  <div className={styles.avatar}>
                      <Image 
                      width={0}
                      height={0}
                      src={imagePreview} 
                      layout = 'responsive'
                      alt="Imagem do usuário" />

                        <div 
                        className={styles.newImage}
                        >

                                <Input
                                onChange={ e => HandleChangeImgAvatar(e)}
                                className={styles.input} 
                                type='file'/>

                                <MdAddAPhoto 
                                size = {20} 
                                className = {styles.iconImage}/>


                        </div>
                            

                </div>


                <label > 
                Nome

                    <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    icon={CgProfile}
                    type='text'

                    />

                </label>

                <label > 
                  Email
                    <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    icon={AiOutlineMail}
                    type='text'
                    />

                </label>

                <label > 
                    Ocupação
                    <Input
                    value={ocupation}
                    onChange={e => setOcuparion(e.target.value)}
                    icon={MdComputer}
                    type='text'
                    />

                </label>

                <label > 
                    Senha antiga
               
                    <Input
                    onChange={e => setOld_password(e.target.value)}
                    icon={RiLockPasswordLine}
                    type='password'
                    />

                </label>

                <label > 
                    Nova senha
               
                    <Input
                    onChange={e => setPassword(e.target.value)}
                    icon={RiLockPasswordLine}
                    type='password'
                    />

                </label>

                <Button
                onClick={() => HandleUpdateProfile()}
                isLoading = {buttonLoading}
                title='Salvar'
                 />
                

              </Form>
        </div>
        </LayoutPortfolio>
</>        

    )
}
 

export const getServerSideProps : GetServerSideProps<UsersProps> = async (ctx) => {
    try{
        const {id} = ctx.query;

        const response = await api.get(`/users/${id}`)
        const data = response.data

        return{

            props: {
                id : id || null,
                nameData : data.name || '', 
                emailData : data.email || '', 
                ocupationData : data.ocupation || '', 
                imgData : data.img || null
                
            }
        }

    }catch{
        return{
            props : { 
                id : '',
                nameData : "", 
                emailData : "", 
                ocupationData : "",
                imgData : null
            }
        }
    }
}