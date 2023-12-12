//utils
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next';
import { SyntheticEvent, useState } from 'react'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Form from '@/components/Form'
import TagItem from '@/components/TagItem'
import Carousel from '@/components/Carousel'


interface TechnologiesProps{
    name? : string
}



interface ProjectProps{
    id : number
    name : string
    img? : string
    description : string
    link : string
    technologies : TechnologiesProps[] 
}



interface EditSkillsProps{
    projectsData : ProjectProps[]
    technologiesData : TechnologiesProps[]
}


export default function EditSkills({ technologiesData, projectsData } : EditSkillsProps ){
    const [technologies, setTechnologies] = useState<TechnologiesProps[]>(technologiesData)
    const [newTechnologie, setNewTechnologie] = useState<string>('')
    const [buttonLoading, setButtonLoading] = useState(false)
    const routes = useRouter()
    const {id}   = routes.query as { id : string | number}




    const data = [
        {   
            id : 4,
            name : "teste",
            description : "hahahaaha", 
            link : "string"
        }
    ]

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



    async function HandleAddTechnologies(){
        setButtonLoading(true)

        if(newTechnologie){
            toast.warn("Ops... Salve todos os campos de tecnologias")
        }

        try{    
            await api.put("/technologies", {technologies})

           toast.success("Tecnologias salvas com sucesso.")

        }catch(error){
            if(error.response.data.message){

                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível salvar as tecnologias.")
            }
        }finally{
            setTimeout(() => {
             setButtonLoading(false)

            }, 500)

        }
    }


   
    return(

<LayoutPortfolio>

       
            <div className={styles.content}>

                    <TextShadow
                    className={styles.textshadow}
                    title='Editar - habilidades' 
                    />


                    <Form className={styles.editTechnologies}>

                        <label>
                        
                            Tecnologias
                            <div className={styles.technologies}>

                               {technologies && technologies.map((technologie, index) => (
                                   <TagItem 
                                    onClick={() => RemoveTechnologie(technologie.name)}
                                   key={String(index)}
                                   value={technologie.name}
                                   />

                               ))} 

                                <TagItem
                                onClick={() => HandleNewTechnologie()}
                                onChange={(e) => setNewTechnologie(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                value={newTechnologie}
                                isNew 
                                placeholder='Adicionar'
                                />

                            </div>

                        </label>


                    </Form>


                    <Button 
                    isLoading = {buttonLoading}
                    onClick={() => HandleAddTechnologies()}
                    className={styles.button}
                    title='Salvar technologies' />    


            </div>

            
            <Carousel data = {projectsData} />

            <Button 
            onClick={ () => routes.push(`/portfolio/${id}/edit/work`)}
            title='Próximo' />     
             
</LayoutPortfolio>
                    

    )
}





export const getServerSideProps: GetServerSideProps<EditSkillsProps> = async (ctx) =>{
    try{
        const {id} = ctx.query;
        const projectResponse = await api.get(`/projects/${id}`)
        const projectsData = projectResponse.data

        const technologiesResponse = await api.get(`/technologies/${id}`)
        const technologiesData = technologiesResponse.data


        return{
            props : {
                technologiesData : technologiesData || [],
                projectsData : projectsData || []
            }
        }

    }catch(error){
        console.log("error" + error)

        return{
            props : {
                technologiesData : [],
                projectsData : []
            }
        }
    }
}

