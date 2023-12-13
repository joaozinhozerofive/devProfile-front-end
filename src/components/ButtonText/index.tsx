//styles
import styles from './styles.module.scss'
//components
import Loading  from '../Loading';
//types
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
//fonts
import { Poppins } from 'next/font/google';





interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{ 
    className? : string,
    icon?: IconType, 
    isLoading? : boolean,
    title? : string,
    onCLick? :  React.MouseEvent
}

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })

   export default function ButtonText({icon : Icon, isLoading, onClick, className,title, ...rest} : ButtonProps){
    return(
        <button 
        onClick = {onClick}
        type='button'
        disabled={isLoading} 
        className={`${className} ${styles.button} ${poppins.className}`} 
        >
            
            {Icon && <Icon color='white' size={20}/>}
            {isLoading ? <Loading/> : title }
            

        </button>
    )
}