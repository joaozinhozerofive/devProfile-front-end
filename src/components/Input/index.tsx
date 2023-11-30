import './style.module.scss'
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import styles from './style.module.scss'
import { Poppins } from 'next/font/google';


import Loading  from '../Loading';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ 
    className? : string,
    icon?: IconType, 
    type : string,
    isLoading? : boolean,
    placeholder? : string,
    onChange ? : ChangeEventHandler,
    value? : string | number
    maxLength? : number
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function Input({icon : Icon, type, value, isLoading, placeholder, maxLength, className, onChange, ...rest} : InputProps){
    return(

        <div className={`${styles.input} ${className} `} >
            
            {Icon && <Icon color='gray' size={20} />}

            <input
             maxLength={maxLength}
             value={value}
             onChange={onChange}
             className={`${poppins.className} `}
             placeholder={placeholder}
             type={type}
             />

            {isLoading ? <Loading/> : "" }

        </div>

        
    )
}