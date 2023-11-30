//utils
import {InputHTMLAttributes, ChangeEventHandler} from 'react'

//styles
import styles from './styles.module.scss'


//icons
import { FiPlus, FiX } from "react-icons/fi"



//fonts 
import { Poppins } from 'next/font/google'



interface TagItemProps extends InputHTMLAttributes<HTMLInputElement>{
value? : string, 
className? : string,
isNew? : boolean, 
onChange? : ChangeEventHandler,
placeholder? : string,


}


const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


export default function TagItem({ value, className, isNew, placeholder, onChange, ...rest} :  TagItemProps){


    return(
        <div className={`${ isNew ? styles.isNew : styles.tagItem} ${className}`}>

            <input 
            placeholder={placeholder}
            value={value}
            className={`${poppins.className} `}
            onChange={onChange}
            readOnly = {isNew ? false : true}
            type="text"
             />

             <button type='button'>

                {isNew ? 
                    <FiPlus
                    color = 'gray'
                    type = 'button'/> 
                    : 
                    <FiX
                    color = 'red'
                    type = 'button'/>
                }

             </button>

        </div>
    )

}