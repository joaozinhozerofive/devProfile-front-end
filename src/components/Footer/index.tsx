import Image from "next/image"
import styles from './styles.module.scss'
import devIcon from '../../../public/devIcon.png'

import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] // obrigatório
   })


   interface FooterProps{
    className : string
   }

export default function Footer({className} : FooterProps){
    return(
        <div className={`${styles.footerContainer} ${poppins.className} ${className}`}>
       
        <div className={styles.footer}>
            <Image className={styles.imgFooter} src={devIcon} alt="Logo dev Profile" />
            <h1>Dev Profile</h1>
         </div>

        <h2>&copy; 2023 - Todos os direitos reservados.</h2>
        
        </div>
    )
}