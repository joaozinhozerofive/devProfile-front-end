//utils 


//icons
import { FiEdit } from 'react-icons/fi'


//components
import TextShadow from '@/components/TextShadow'
import LayoutPortfolio from '@/components/Layout Portfolio'
import Link from 'next/link'


//styles
import styles from './styles.module.scss'
import { useRouter } from 'next/router'


export default function Work(){
    


    return(
        <LayoutPortfolio className={styles.layout}>


                <div className={styles.content}>
                    <TextShadow
                    className={styles.textShadow}
                    title='Experiência'
                     />


                     <div className={styles.experience}>
                        
                



                        <h1>AudioFrahm industria e comercio de eletronicos</h1>
                        <p>Menor aprendiz -- curso de aprendizagem industrial na área de assistente administrativo - SENAI</p>
                        <span> 01/2020 - 12/2020  </span>


                     </div>
                </div>
                
        </LayoutPortfolio>
    )
}