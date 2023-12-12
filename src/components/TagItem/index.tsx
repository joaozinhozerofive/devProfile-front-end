//utils
import {InputHTMLAttributes, ChangeEventHandler} from 'react'
//styles
import styles from './styles.module.scss'
//icons
import { FiPlus, FiX } from "react-icons/fi"
//fonts 
import { Poppins } from 'next/font/google'



interface TagItemProps extends InputHTMLAttributes<HTMLInputElement>{
className? : string,
isNew? : boolean, 
onClick ? : () => void
}


const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function TagItem({  className, isNew, onClick, ...rest} :  TagItemProps){


    return(
        <div className={`${ isNew ? styles.isNew : styles.tagItem} ${className}`}>

            <input 
            {...rest}
            className={`${poppins.className} `}
            readOnly = {isNew ? false : true}
            type="text"
             />

             <button type='button'>

                {isNew ? 
                    <FiPlus
                    onClick = {onClick}
                    color = 'gray'
                    type = 'button'/> 
                    : 
                    <FiX
                    onClick = {onClick}
                    color = 'red'
                    type = 'button'/>
                }

             </button>

        </div>
    )

}