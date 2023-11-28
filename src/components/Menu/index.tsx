 //estilização
 import styles from './styles.module.scss'

 //icons
 import { FaGithub } from "react-icons/fa";
 import { CiLinkedin } from "react-icons/ci";
 import { FiEdit2 } from "react-icons/fi";


 //components
 import Link from 'next/link';


 //types
 import {HTMLAttributes} from 'react'
import { useRouter } from 'next/router';



interface UserProps{
    link? : string
}


 interface MenuProps extends HTMLAttributes<HTMLDivElement>{
    className? : string, 
    user? : string
 }
 
 
 export default function Menu({className, user, ...rest} : MenuProps){
     
     const routes = useRouter();
     const {id}   = routes.query as { id : string | number}


    return(
        <div className={`${styles.menuContainer} ${className}`}>



            <ul>
                <Link href={`./${id}/about`}> Sobre </Link>
                <Link href="/sobre"> Habilidades </Link>
                <Link href="/sobre"> Experiência </Link>
                <Link href="/sobre"> Contato </Link>
                <Link href="/sobre"> Blog </Link>
                <Link href="/sobre"> Edit <FiEdit2/> </Link> 
            </ul>


                <div>
                 <Link target = "_blank" href={'https://github.com/joaozinhozerofive'}>

                    <FaGithub 
                    size = {20}/>

                 </Link>
                    
                <Link target = "_blank" href = 'https://www.linkedin.com/in/jo%C3%A3o-machado-rorato-9674541a3/'>

                <CiLinkedin 
                size = {20}/>

                </Link>
                </div>

        </div>
    )
 }
