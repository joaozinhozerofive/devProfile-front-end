import './style.module.scss'
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import styles from './style.module.scss'
import { Poppins } from 'next/font/google';


import Loading  from '../Loading';


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