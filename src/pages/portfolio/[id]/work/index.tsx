//utils 
import { api } from '@/services/api'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
//styles
import styles from './styles.module.scss'
//components
import TextShadow from '@/components/TextShadow'
import LayoutPortfolio from '@/components/Layout Portfolio'


interface WorkDataProps{
    id : number
    companyName : string
    city : string
    FU : string
    startDate : string
    endDate : string
    description : string
}

interface WorkProps{
    data : WorkProps[]
}



export default function Work({data}){
    const routes = useRouter()
    const {id} = routes.query


    return(
<>

<Head>
    <title>Dev Profile - Experiência</title>
</Head>
<LayoutPortfolio>

            <div className={styles.content}>
                         <TextShadow
                            className={styles.textShadow}
                            title='Experiência'
                            />


                        {data && data.map(work => (

                        <div key={String(work.id)} className={styles.experience}>


                        <h1>{`${work.companyName},`} <span>{`${work.city} - ${work.FU}`}</span></h1>
                        <p>{`${work.description}`}</p>
                        <span>{`${work.startDate} - ${work.endDate}`}</span>


                        </div>
                        ))}                 
            </div>

</LayoutPortfolio>
</>

                
    )
}



export const getServerSideProps  : GetServerSideProps<WorkProps> = async (ctx) =>{
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