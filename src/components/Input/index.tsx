import './style.module.scss'
import React, { ReactNode, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import styles from './style.module.scss'
import { Poppins } from 'next/font/google';


import Loading  from '../Loading';


interface inputProps extends InputHTMLAttributes<HTMLInputElement>{ 
    className? : string,
    icon?: IconType, 
    type : string
    isLoading? : boolean
    placeholder? : string
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function Input({icon : Icon, type, isLoading, placeholder, className, ...rest} : inputProps){
    return(
        <div className={`${styles.input}`} >
            
            <p>{Icon && <Icon color='gray' size={20}/>}</p>

            <input
             className={poppins.className}
             placeholder={placeholder}
             type={type}/>

            {isLoading ? <Loading/> : "" }

        </div>
    )
}