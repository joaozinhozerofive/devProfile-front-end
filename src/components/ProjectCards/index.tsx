//utils
import {HTMLAttributes} from 'react'
import { register } from 'swiper/element/bundle'
register();

//styles
import styles from './styles.module.scss'

//components
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import TextShadow from '../TextShadow';

//icons 
import { FiEdit } from 'react-icons/fi';


import avatarUrl from '../../../public/exampleimagem.avif'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '@/services/api';

//interfaces
interface TechnologiesProps{
    name? : string
}

/* eslint-disable @next/next/no-img-element */


interface ProjectProps{
    id : number
    name : string
    img? : string
    description : string
    link : string
    technologies? : TechnologiesProps[] 

}

interface ProjectCardsProps extends  HTMLAttributes<HTMLDivElement>{
    project? : ProjectProps, 
    className? : string, 
}


export default function ProjectCards({project, className, ...rest} : ProjectCardsProps){
    const routes = useRouter()
    const {id} = routes.query as {id : string | number}
    
    function pathNameIncludes(path : string ){

        const pathIsIncludes : boolean = routes.pathname.includes(path)


        return pathIsIncludes
     }


    return(

        
            <div key={project.id} className={styles.projectCards}>
            
                <TextShadow 
                className={styles.textShadow}
                title= {project.name}
                />
                <Link 
                    className = {` ${pathNameIncludes('edit/skills') ? styles.fiEdit : 'hidden'}`}
                    href={`/portfolio/4/edit/editProjects/${project.id}`}>

                        <FiEdit 
                        size = {20} />

                 </Link>



                 <img
                    className={styles.projectImg}
                    src = {`${api.defaults.baseURL}/files/${project.img}`}
                    alt = "Imagem do projeto" />

                    <p>Tecnologias usadas</p>

                <div className={styles.technologies}>
                    
                    {project.technologies && project.technologies.map((technologie, index) => (
                    <a key={String(index)}> {technologie.name}  </a>
                    ))}

                </div>

                <p>
                

                 {`${project.description}`}   

                </p>

            </div>


    )

}


