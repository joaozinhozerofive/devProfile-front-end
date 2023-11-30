//utils 
import {HTMLAttributes, ChangeEventHandler} from 'react'

//styles 
import styles from './style.module.scss'

//icons 
import { FiSearch } from 'react-icons/fi'
import { IoIosLogOut } from "react-icons/io";


//components
import Loading from '../Loading'
import Button from '../Button'
import Input from '../Input';


interface HeaderProps extends HTMLAttributes<HTMLDivElement>{
    search? : ChangeEventHandler, 
    className? :  string, 


}

export default function Header({search, className, ...rest } : HeaderProps){
    return(
        <div className={`${className} ${styles.headerContainer}`}>


            <Input 
            isLoading = {true}
            icon={FiSearch}
            placeholder='Pesquise pelo nome do usuário'
            type='text' />


        </div>
    )
}