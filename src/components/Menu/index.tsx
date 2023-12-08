 //utils
 import { useAuth } from '@/hook/AuthContext';
 
 //estilização
 import styles from './styles.module.scss'

 //icons
 import { FaGithub } from "react-icons/fa";
 import { CiLinkedin } from "react-icons/ci";
 import { FiEdit2 } from "react-icons/fi";
 import { FiPlus, FiLogOut } from 'react-icons/fi';

 //components
 import Link from 'next/link';
 import Button from '../Button';
 

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
   const routes = useRouter()
   const {id}   = routes.query as { id : string | number}
   const {signOut} = useAuth();


     function pathNameIncludes(path : string ){

        const pathIsIncludes : boolean = routes.pathname.includes(path)


        return pathIsIncludes
     }


     


    return(
        <div className={`${styles.menuContainer} ${className}`}>



            <ul>
                <Link 
                 className={pathNameIncludes('about') ? styles.active : ""}
                 href={`/portfolio/${id}/about`}>
                    Sobre
                 </Link>

                 <Link 
                 className={pathNameIncludes('skills') ? styles.active : ""}
                 href={`/portfolio/${id}/skills`}>
                    Habilidades
                 </Link>

                 <Link 
                 className={pathNameIncludes('work') ? styles.active : ""}
                 href={`/portfolio/${id}/work`}>
                    Experiência
                 </Link>

                 <Link 
                 href={`/portfolio/${id}`}>
                    Blog
                 </Link>

                <Link
                 className={pathNameIncludes('edit') ? styles.active : ""}
                 href={`/portfolio/${id}/edit`}> Editar <FiEdit2/>
                </Link> 

               <Link 
               className={pathNameIncludes('newProject') ? styles.active : ""}
               href={`/portfolio/${id}/newProject`}>

                  <p> <FiPlus/> Novo Projeto</p>
               </Link>


              <Link 
               className={pathNameIncludes('newWork') ? styles.active : ""}
               href={`/portfolio/${id}/newWork`}>

                  <p> <FiPlus/> Nova experiência</p>
               </Link>

               <p onClick={() => signOut()}>
                  <FiLogOut size={25}/>
               </p>
                


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
