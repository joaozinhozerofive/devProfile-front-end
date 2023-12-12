//styles 
import styles from './styles.module.scss'
//types
import {HTMLAttributes} from 'react'


interface TextShadowProps extends HTMLAttributes<HTMLDivElement>{
    title : string, 
    className? : string, 
}



export default function TextShadow({title, className, ...rest} : TextShadowProps){

    return(
        <h1 className={`${className} ${styles.textShadow}`}>
            {title}
        </h1>
    )
    
}