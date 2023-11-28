//estilização
import styles from './styles.module.scss'


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

            <h1>j</h1>
            
            <h3>João</h3>


            <p>Web Developer</p>

        </div>

    )
}