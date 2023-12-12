//utils
 import { useAuth } from '@/hook/AuthContext';
 //styles
 import styles from './styles.module.scss'
 //components
  import Link from 'next/link';
//icons
 import { FaGithub } from "react-icons/fa";
 import { CiLinkedin } from "react-icons/ci";
 import { FiEdit2 } from "react-icons/fi";
 import { FiPlus, FiLogOut } from 'react-icons/fi';
 import { IoPersonOutline } from "react-icons/io5";
//types
import {HTMLAttributes} from 'react'
import { useRouter } from 'next/router';



interface UserProps{
    link? : string
}

interface ContactsProps{
    whatsapp : string
    linkedin : string
    github : string
    email : string
}


 interface MenuProps extends HTMLAttributes<HTMLDivElement>{
    className? : string, 
    contacts : ContactsProps
 }
 
 
 export default function Menu({className, contacts, ...rest} : MenuProps){
   const routes = useRouter()
   const {id}   = routes.query 
   const {signOut, user_id} = useAuth();




   const userIdMatched = user_id === Number(id)

   console.log(userIdMatched)


     function pathNameIncludes(path : string ){

        const pathIsIncludes : boolean = routes.pathname.includes(path)


        return pathIsIncludes
     }


     


    return(
        <div className={`${styles.menuContainer} ${className}`}>



            <ul>
               {userIdMatched ? (
                <Link 
                 className={pathNameIncludes('profile') ? styles.active : ""}
                 href={`/portfolio/${id}/profile`}>
                    <IoPersonOutline size = {20}/>
                 </Link>

               ) : ""}

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

                {userIdMatched ? (
                <Link
                 className={pathNameIncludes('edit') ? styles.active : ""}
                 href={`/portfolio/${id}/edit`}> Editar <FiEdit2/>
                </Link> 

                ) : ""}  

               {userIdMatched? (
                  <Link 
                  className={pathNameIncludes('newProject') ? styles.active : ""}
                  href={`/portfolio/${id}/newProject`}>
   
                     <p> <FiPlus/> Novo Projeto</p>
                  </Link>
               ) : ""} 

               

              {userIdMatched ? (
               <Link 
               className={pathNameIncludes('newWork') ? styles.active : ""}
               href={`/portfolio/${id}/newWork`}>

                  <p> <FiPlus/> Nova experiência</p>
               </Link>
              
              ) : ""}    
              

               <p onClick={() => signOut()}>
                  <FiLogOut size={25}/>
               </p>
                


            </ul>
            

                <div>
               {contacts?.github ? (
                  <Link target = "_blank" href={contacts?.github}>

                  <FaGithub 
                  size = {20}/>

               </Link>
               ) : ""}
                 
                {contacts?.linkedin ? (
                  <Link target = "_blank" href = {contacts?.linkedin}>

                  <CiLinkedin 
                  size = {20}/>
  
                  </Link>
  

                ):  ""}    
                
                </div>


        </div>
    )
 }
