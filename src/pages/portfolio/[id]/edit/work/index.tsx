//utils 
import {useState} from 'react';



//icons
import {  FiEdit } from 'react-icons/fi'


//components
import TextShadow from '@/components/TextShadow'
import LayoutPortfolio from '@/components/Layout Portfolio'
import Link from 'next/link'
import Button from '@/components/Button'


//styles
import styles from './styles.module.scss'
import { useRouter } from 'next/router'




export default function EditWork(){
    

    const routes = useRouter()
    const {id} = routes.query
    

    return(
        <LayoutPortfolio className={styles.layout}>


                <div className={styles.content}>
                    <TextShadow
                    className={styles.textShadow}
                    title='Editar - Experiência'
                     />


                     <div className={styles.experience}>

                        <Link href = {`/portfolio/${id}/edit/editWorks/5`}className = {styles.fiEdit}>

                             <FiEdit size={20} />

                        </Link>

                        
                



                        <h1>AudioFrahm industria e comercio de eletronicos</h1>
                        <p>Menor aprendiz -- curso de aprendizagem industrial na área de assistente administrativo - SENAI</p>
                        <span> 01/2020 - 12/2020  </span>

                     </div>

                     <Button 

                        onClick={ () => routes.push(`/portfolio/${id}`)}
                        title='Finalizar' />

                </div>
                
        </LayoutPortfolio>
    )
}