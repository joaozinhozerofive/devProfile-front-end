//utils
import {HTMLAttributes} from 'react'
import { register } from 'swiper/element/bundle'
import { useRouter } from 'next/router';
import { api } from '@/services/api';
register();
//styles
import styles from './styles.module.scss'
//components
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import TextShadow from '../TextShadow';
import Link from 'next/link';
//icons 
import { FiEdit } from 'react-icons/fi';
//assets
import avatarUrl from '../../../public/exampleimagem.avif'



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
    const {id} = routes.query 
    
    function pathNameIncludes(path : string ){

        const pathIsIncludes : boolean = routes.pathname.includes(path)


        return pathIsIncludes
     }


    return(

        
            <div 
            key={project.id} 
            className={styles.projectCards}>
            
                <TextShadow 
                className={styles.textShadow}
                title= {project.name}
                />
                <Link 
                    className = {` ${pathNameIncludes('edit/skills') ? styles.fiEdit : 'hidden'}`}
                    href={`/portfolio/${id}/edit/editProjects/${project.id}`}>

                        <FiEdit 
                        size = {20} />

                 </Link>


                <a 
                target='_blank'
                href={project.link}>
                 <img
                    className={styles.projectImg}
                    src = {`${api.defaults.baseURL}/files/${project.img}`}
                    alt = "Imagem do projeto" />
                </a>

                    <p>Tecnologias usadas</p>

                <div className={styles.technologies}>
                    
                    {project.technologies && project.technologies.map((technologie, index) => (
                    <p key={String(index)}> {technologie.name}  </p>
                    ))}

                </div>

                <p>
                

                 {`${project.description}`}   

                </p>

            </div>


    )

}


