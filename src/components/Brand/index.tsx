//estilização
import styles from './styles.module.scss'

//components
import TextShadow from '../TextShadow'

//icons 
import { FiMail } from 'react-icons/fi'


//types
import {HTMLAttributes} from 'react'



interface UserProps{
    name : string
}

interface BrandProps extends HTMLAttributes<HTMLDivElement>  {
    className? : string
    user : UserProps
    contacts : ContactsProps
}

interface ContactsProps{
    email : string
}


export default function Brand({ className, user,contacts, ...rest } : BrandProps){
    const initialLetterName : string = user?.name?.charAt(0)
    const name = user?.name.split(" ")[0]

    return (
        <div 
        {...rest}
        className={`${styles.brandContainer} ${className}`}>

         <TextShadow className={styles.h1} title={initialLetterName} />  
            
            <h3>{name}</h3>

        {contacts?.email ? 
        
        ( <a 
                target='_blank'
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contacts?.email}`}>
                <FiMail size = {20}/>
                Email
            </a>) : "" }
            

        </div>

    )
}