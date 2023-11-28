import Loading  from '../Loading';
import { ButtonHTMLAttributes } from 'react';

import { Poppins } from 'next/font/google';


import { IconType } from 'react-icons';
import styles from './styles.module.scss'



interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement>{ 
    className? : string,
    icon?: IconType, 
    isLoading? : boolean
    placeholder? : string
    title? : string
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })

   export default function Input({icon : Icon, isLoading, placeholder, className,title, ...rest} : ButtonProps){
    return(
        <button 
        type='button'
        disabled={isLoading} 
        className={`${className} ${styles.button} ${poppins.className}`} 
        >
            
            {Icon && <Icon color='white' size={20}/>}
            {isLoading ? <Loading/> : title }
            

        </button>
    )
}