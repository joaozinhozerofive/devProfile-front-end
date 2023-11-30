//utils
import {ReactNode, FormHTMLAttributes} from 'react'

//styles 
import styles from './styles.module.scss'


 
interface FormProps extends FormHTMLAttributes<HTMLInputElement>{
    children : ReactNode, 
    className? : string, 

}

export default function Form({children, className} :  FormProps){
        return(
            <form className={`${className} ${styles.form}`}>

                {children}

            </form>
        )
}