import './style.module.scss'
import React, { ReactNode, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import styles from './style.module.scss'
import { Poppins } from 'next/font/google';


import Loading  from '../Loading';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ 
    className? : string,
    icon?: React.ComponentType<{ color: string; size: number }>, 
    type : string
    isLoading? : boolean
    placeholder? : string
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function Input({icon : Icon, type, isLoading, placeholder, className, ...rest} : InputProps){
    return(
        <div className={`${styles.input} ${className} `} >
            
            {Icon && <Icon color='gray' size={20} />}

            <input
             className={`${poppins.className} `}
             placeholder={placeholder}
             type={type}/>

            {isLoading ? <Loading/> : "" }

        </div>
    )
}