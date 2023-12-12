//estilização
import styles from './styles.module.scss'

//components
import TextShadow from '../TextShadow'
import { FiMail } from 'react-icons/fi'


//types
import {HTMLAttributes} from 'react'



interface UserProps{
    username : string, 
    resume : string
}

interface BrandProps extends HTMLAttributes<HTMLDivElement>  {
    className? : string
    user? : UserProps
}


export default function Brand({ className, user, ...rest } : BrandProps){
    
    return (
        <div 
        {...rest}
        className={`${styles.brandContainer} ${className}`}>

         <TextShadow className={styles.h1} title='J' />  
            
            <h3>João</h3>


            <p>emaail</p>

        </div>

    )
}