//utils
import {HTMLAttributes} from 'react'
import { register } from 'swiper/element/bundle'
register();

//styles
import styles from './styles.module.scss'

//components
import {SwiperSlide} from 'swiper/react'
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

//interfaces
interface ProjectProps{
    name : string, 
    img : string, 
    description : string, 
    link : string

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
            <div className={styles.projectCards}>

                <TextShadow 
                className={styles.textShadow}
                title='Loja de roupas'
                />
                <Link 
                 className = {` ${pathNameIncludes('edit/skills') ? styles.fiEdit : 'hidden'}`}
                 href={`/portfolio/${id}/edit/editProjects/5`}>

                    <FiEdit
                    size = {20} />

                 </Link>

                <Image
                className={styles.projectImg}
                 src = {avatarUrl}
                 alt = "Imagem do projeto" />

                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>

    )

}