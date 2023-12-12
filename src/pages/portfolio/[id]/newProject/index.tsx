//utils
import { useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useAuth } from '@/hook/AuthContext';
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Form from '@/components/Form'
import Image from 'next/image'
import TagItem from '@/components/TagItem'
import Button from '@/components/Button'
import PageError from '@/components/PageError';
//icons
import { MdAddAPhoto } from "react-icons/md";
//assets
import exampleImage from '../../../../../public/exampleimagem.avif'


interface TechnologiesProps{
    name :  string
}


export default function NewProject(){

    const [name, setName ] = useState<string>("")
    const [img, setImg] = useState<File | undefined>()
    const [description, setDescription] = useState<string>("")
    const [technologies, setTechnologies] = useState<string[]>([])
    const [link, setLink] = useState<string>("")

    const [newTechnologie, setNewTechnologie] = useState<string>("")
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const [imagePreview, setImagePreview] = useState<string | undefined>()


    const projecImgUrl = imagePreview ? imagePreview : exampleImage
    const routes = useRouter()
    const {id} = routes.query;

    const {user_id} = useAuth()

    const userIdMatched = user_id === Number(id)



    function handleKeyDown(event) {
        if(event.key === 'Enter'){
            HandleNewTechnologie()
        }
    }

    function HandleNewTechnologie(){
        setTechnologies(technologies => [...technologies,   newTechnologie])
        setNewTechnologie('')
    }


    function RemoveTechnologie(name : string){
        
        const technologiesFiltered = technologies.filter(technologies => technologies !== name)


        setTechnologies(technologiesFiltered)
    }



    async function HandleChangeImgProject(e){
        const file = e.target.files[0]


        setImg(file)

        const imagePreview  = URL.createObjectURL(file)


        setImagePreview(imagePreview)
    }


    async function handleNewProject(){
        setButtonLoading(true)

        if(!img){
            toast.error("Por favor insira uma imagem para o seu projeto.")
        }
        
        try{

            const formData = new FormData()
            formData.append("img", img)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("link", link)

            if(technologies.length < 2){
                return toast.error("Por favor, insira ao menos duas tecnologias")
            }


                technologies.map(technologie => {
                    formData.append("technologies", technologie)
                })

            



            await api.post(`/projects`, formData)

            toast.success("Projeto criado com sucesso")

            routes.back()

        }catch(error){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível criar este projeto.")
            }

        }finally{
            setTimeout(() =>{

                setButtonLoading(false)
                
            }, 500)
        }
    }

    if(!userIdMatched){
        return (
            <PageError />
        )
    }


    return(
<>


<Head>
    <title>Dev Profile - Novo Projeto</title>
</Head>
<LayoutPortfolio>
        <div className={styles.content}>
        
                <TextShadow
                className={styles.textshadow}
                title='Novo projeto' 
                />



            <Form className={styles.editProjects}>


                    <label>

                        Nome do projeto
                        <Input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Ex.: Loja de roupas'
                        className={styles.input}
                        type='text' />

                    </label>


                    <div className={styles.projectImg}>
                        <Image
                        width={0}
                        height={0}
                        layout='responsive'
                        src={projecImgUrl} 
                        alt='Imagem do projeto' />


                <div 
                className={styles.newImage}
                >

                        <Input
                        onChange={ e => HandleChangeImgProject(e)}
                        className={styles.input} 
                        type='file'/>

                        <MdAddAPhoto size = {20} className = {styles.iconImage}/>

                </div>



                    </div>


                    <label>
                        Descrição do projeto
                        
                        <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Seja breve, escreva as funcionalidades e como funciona o projeto'></textarea>

                    </label>
                    
                    <label>
                        Tecnologias usadas
                        {technologies && technologies.map((technologie, index) => (
                            <TagItem
                            onClick={() => RemoveTechnologie(technologie)}
                            key={String(index)}
                            value={technologie}              
                            />

                                    ))} 
                            <TagItem
                            onKeyDown={(e) => handleKeyDown(e)}
                            onClick={() => HandleNewTechnologie()}
                            onChange={(e) => setNewTechnologie(e.target.value)}
                            value={newTechnologie}
                            isNew 
                            placeholder='Adicionar'
                            /> 

                    </label>


                    <label>
                        Link do projeto
                        <Input
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder='Cole o link do seu projeto'
                        className={styles.input}
                        type='text'/>
                    </label>


                    <Button
                    onClick={() => handleNewProject()}
                    isLoading = {buttonLoading}
                    title='Salvar' />

            </Form>
        </div>

        
</LayoutPortfolio>

</>

    )


}