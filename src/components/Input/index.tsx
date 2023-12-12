//utils
import React, {InputHTMLAttributes } from 'react';
//styles
import styles from './style.module.scss'
//components
import Loading  from '../Loading';
//types
import { IconType } from 'react-icons';
//fonts
import { Poppins } from 'next/font/google';




interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ 
    icon?: IconType, 
    id ? : string
    isLoading? : boolean,
    className? : string,
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function Input({icon : Icon, id, isLoading, className, ...rest} : InputProps){
    return(

        <div className={`${styles.input} ${className} `} >
            
            {Icon && <Icon color='gray' size={20} />}

            <input
            {...rest}
             id={id}
             className={`${poppins.className} `}
             />

            {isLoading ? <Loading/> : "" }

        </div>

        
    )
}