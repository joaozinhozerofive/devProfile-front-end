//utils
import { useRouter } from 'next/router';
import {useState} from 'react'
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
//styles
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Image from 'next/image'
import Input from '@/components/Input'
import Form from '@/components/Form'
import TagItem from '@/components/TagItem'
import Button from '@/components/Button'
import PageError from '@/components/PageError';
//icons 
import { MdAddAPhoto } from "react-icons/md";
import { useAuth } from '@/hook/AuthContext';





interface TechnologiesProps{
    name : string
}



interface ProjectsProps {
    name? : string 
    img?: string
    description? : string
    link?: string
    technologies?: TechnologiesProps[]
}
interface Props{
    project_id : string | string []
}

export default function EditProjects(){
    const [ data, setData] = useState<ProjectsProps>({})
    const [name, setName] = useState<string>('')
    const [img, setImg] = useState<File | string>('')
    const [description, setDescription] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [technologies, setTechnologies] = useState<TechnologiesProps[]>()
    const [newTechnologie, setNewTechnologie] = useState<string>('')

    const [imagePreview, setImagePreview] = useState<string | undefined>()
    const [buttonLoading, setButtonLoading] = useState(false)

    
    const routes = useRouter();
    const{id} = routes.query;

    const{project_id} = routes.query;

    const {user_id} = useAuth();

    const userIdMatched = user_id === Number(id)



    
   
    useEffect(() => {
        async function fetchProject(){
            try{

                const response = await api.get(`/projects/${project_id}/detail`)
                const projectData = response.data
                setData(projectData)


                setName(projectData.name)
                setImg(projectData.img)
                setDescription(projectData.description)
                setLink(projectData.link)
                setTechnologies(projectData.technologies)
                setImagePreview(`${api.defaults.baseURL}/files/${projectData.img}`)

            }catch(error){
                if(error.response.data.message){
                    toast.error(error.response.data.message)
                }
            }
        }

        fetchProject()

    }, [project_id])
    



    function handleKeyDown(event) {
        if(event.key === 'Enter'){
            HandleNewTechnologie()
        }
    }

    

    function HandleNewTechnologie(){
        if(!newTechnologie){
            toast.warn("Você não tem nenhuma tecnologia para adicionar")
        }
        
        setTechnologies(prevState => [...prevState,  {name : newTechnologie} ])
        setNewTechnologie('')
    }


    function RemoveTechnologie(name : string){
        
        const technologiesFiltered = technologies.filter(technologies => technologies.name !== name)


        setTechnologies(technologiesFiltered)
    }




    async function HandleChangeImgProject(e){
        const file = e.target.files[0]


        setImg(file)

        const imagePreview  = URL.createObjectURL(file)


        setImagePreview(imagePreview)
    }


   


    async function HandleUpdateProject(){
        setButtonLoading(true)
        try{

            const formData = new FormData()
            formData.append("img", img)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("link", link)

            const newTechs = technologies.map(technologie => {
                formData.append("technologies", technologie.name)
            })


            await api.put(`/projects/${project_id}`, formData)

            toast.success("Projeto atualizado com sucesso")

            routes.back()

        }catch(error){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível atualizar este projeto")
            }

        }finally{
            setTimeout(() =>{

                setButtonLoading(false)
                
            }, 500)
        }
    }

    async function handleDeleteProject(){
        setButtonLoading(true)

        try{

            await api.delete(`/projects/${project_id}`)
            toast.success("Projeto deletado com sucesso!!")

            routes.back()
            
        }catch(error){

            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível excluir este projeto")
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


    return (

<LayoutPortfolio>

        <div className={styles.content}>
    
            <TextShadow
            className={styles.textshadow}
            title='Editar - Projetos' 
            />



        <Form className={styles.editProjects}>


                <label>
                    Nome do projeto
                    <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Ex.: Loja de roupas'
                    className={styles.input}
                    type='text' />

                </label>


                <div className={styles.projectImg}>
                        <Image
                                className={styles.imagePreview}
                                src={imagePreview}
                                alt='Imagem do projeto'
                                layout='responsive'
                                height={0} 
                                width={0} 
                                />              
                        
                    <div className={styles.newImage}>
                        
                        
                            <Input
                            name='img'
                            onChange={e => HandleChangeImgProject(e)}
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
                    placeholder='Seja breve, escreva as funcionalidades e como funciona o projeto'>
                    </textarea>

                </label>
                
                <label >
                    Tecnologias usadas

                    <div className={styles.technologies}>


                        {technologies && technologies.map((technologie, index) => (
                        <TagItem
                        onClick={() => RemoveTechnologie(technologie.name)}
                        key={String(index)}
                        value={technologie.name}              
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

                    </div>               

                </label>


                <label>
                    Link do projeto
                    <Input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder='Cole o link do seu projeto'
                    className={styles.input}
                    type='text'/>
                </label>


                    <Button
                    isLoading = {buttonLoading}
                    onClick={ () => HandleUpdateProject()}
                    title='Salvar' />

                    <Button 
                    className={styles.delete}
                    onClick={ () => handleDeleteProject()}
                    title='Excluir' />


        </Form>
</div>
</LayoutPortfolio>
    )
}





export const getServerSideProps : GetServerSideProps<Props> = async (ctx) =>{
        try{
            const {project_id} = ctx.query;


            return {
                props : {
                    project_id : project_id
                }
            }

        }catch(error){
            console.error(error)

            return {
                props : {
                    project_id : null
                }
            }
        }
}



