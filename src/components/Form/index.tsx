//styles 
import styles from './styles.module.scss'
//utils
import {ReactNode, FormHTMLAttributes} from 'react'




 
interface FormProps extends FormHTMLAttributes<HTMLInputElement>{
    children : ReactNode, 
    className? : string, 

}

export default function Form({children, className} :  FormProps){
        return(
            <form className={`${className} ${styles.formContainer}`}>

                {children}

            </form>
        )
}