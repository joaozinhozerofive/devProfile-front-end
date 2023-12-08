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
import { GetServerSideProps } from 'next';
import { api } from '@/services/api';

interface WorkProps{
    id : number
    companyName : string
    city : string
    FU : string
    startDate : string
    endDate : string
    description : string
}

interface EditWorksProps{
    data : WorkProps[]
}


export default function EditWork({data} : EditWorksProps ){
    

    const routes = useRouter()
    const {id} = routes.query
    

    return(
        <LayoutPortfolio className={styles.layout}>

            {data && data.map(work => (

            
            <div key={String(work.id)} className={styles.content}>

                    <TextShadow
                    className={styles.textShadow}
                    title='Editar - Experiência'
                     />


                     <div className={styles.experience}>

                        <Link href = {`/portfolio/${id}/edit/editWorks/${work.id}`}className = {styles.fiEdit}>

                             <FiEdit size={20} />

                        </Link>

                        <h1>{`${work.companyName},`} <span>{`${work.city} - ${work.FU}`}</span></h1>
                        <p>{`${work.description}`}</p>
                        <span>{`${work.startDate} - ${work.endDate}`}</span>


                     </div>

                     <Button 

                        onClick={ () => routes.push(`/portfolio/${id}`)}
                        title='Finalizar' />

                </div>
                ))}
                
        </LayoutPortfolio>
    )
}



export const getServerSideProps  : GetServerSideProps<EditWorksProps> = async (ctx) =>{
    try{    
        const {id} = ctx.query
        const response = await api.get(`/experience/${id}`)
        const data = response.data


        return {
            props : {
                data: data || []
            }
        }

    }catch{
        return {
            props : {
                data: []
            }
        }
    }
}