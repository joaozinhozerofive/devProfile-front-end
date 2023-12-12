//utils 
import { useRouter } from 'next/router'
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
//styles
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow';
import Carousel from '@/components/Carousel';

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



interface SkillsProps{
    projectsData : ProjectProps[]
    technologiesData : TechnologiesProps[]
}





export default function Skills({projectsData, technologiesData} : SkillsProps){
    const routes = useRouter();
    const {id}   = routes.query as { id : string | number}


    return(

<LayoutPortfolio>



             <div className={styles.content}>

            <div>
                <TextShadow
                className={styles.h1}
                title='Tecnologias' />
                <ul>
                    {technologiesData && technologiesData.map((technologie, index) => (
                        
                        <li key={String(index)}>{technologie.name}</li>
                        
                    ))}
                    
                </ul>
            </div>

            <div>
                <TextShadow
                className={styles.h1}
                title='Projetos'/>

                


            <Carousel
            data={projectsData}
             />

            </div>


             </div>

</LayoutPortfolio>    
       
    )
}


export const getServerSideProps: GetServerSideProps<SkillsProps> = async (ctx) =>{
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

