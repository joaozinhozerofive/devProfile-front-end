//utils 
import {useState, ChangeEvent, useEffect} from 'react'
import { useRouter } from 'next/router'
import { api } from '@/services/api'
import { GetServerSideProps } from 'next'

//styles 
import styles from './styles.module.scss'



//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import Form from '@/components/Form'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'


interface WorkProps{
    companyName : string
    city : string
    FU: string
    startDate : string
    endDate : string
    description : string
}




export default function EditWork({work_id}){
    const [companyName, setCompanyName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [FU, setFU] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [isCurrent, setIsCurrent] = useState<boolean>(false)

    const routes = useRouter()

    console.log(work_id)

    useEffect(() =>{
        async function loadJquery(){
            const $ = (await import('jquery')).default;

            const {mask} = await import ('jquery-mask-plugin')


            $(document).ready(function (){
                $('#startDate').mask('00/00/0000')
            })

            $(document).ready(function (){
                $('#endDate').mask('00/00/0000')
            })
        }

        loadJquery()

        

    }, [])


    useEffect(()=>{

        async function fetchWorks(){
            try{
                const response = await api.get(`/experience/${work_id}/detail`)
                const data = response.data

                setCompanyName(data.companyName)
                setCity(data.city)
                setFU(data.FU)
                setStartDate(data.startDate)
                setEndDate(data.endDate)
                setDescription(data.description)

                
            }catch(error){
                if(error.response?.data?.message){
                    toast.error(error.response.data.message)
                }
            }


        }

        fetchWorks()


    }, [work_id])

    



    return (
        <LayoutPortfolio>

        <div className={styles.content}>
            <TextShadow 
            className={styles.textshadow}
            title='Nova Experiência'/>
            

            <Form>
                <label>
                    Nome da empresa
                    <Input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className={styles.input}
                    placeholder='Ex.: Udemy Tecnologia'
                    type='text'
                    />
                </label>



                <label className={styles.localization}>
                    Localização
                <div> 
                    <label>

                        Cidade

                        <Input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className={styles.input}
                        placeholder='Ex.: Rio do Sul'
                        type='string'
                        />

                    </label>
                    <label>
                        UF
                        <Input
                        value={FU}
                        onChange={e => setFU(e.target.value)}
                        className={styles.input}
                        maxLength={3}
                        placeholder='Ex.: SC'
                        type='text'
                        />

                    </label>

                    
                </div>
                    
                </label>
                <label className={styles.date}>
                    Data - ínicio e término
                <div> 
                    <label>

                        Início

                        <Input
                        id='startDate'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.input}
                        placeholder='20/12/2023'
                        type='string'
                        />

                    </label>


                    <label>
                        Término

                        <Input
                        id='endDate'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.input}
                        placeholder='20/12/2023'
                        type='string'
                        />

                    </label>
                    
                </div>
                    
                </label>

                    <label className={styles.checkbox} htmlFor="checkbox ">
                        Emprego atual
                        <input 
                        onChange={e => setIsCurrent(e.target.checked)}
                        checked = {isCurrent}
                        id='checkbox'
                        type="checkbox" />

                    </label>

                <label>
                        Descrição da atividade

                        <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                         placeholder='Ex.: Assistente financeiro - conferência de balancetes, etc..'>
                         </textarea>

                    </label>



                    <Button
                    onClick={ () => routes.back()}
                    title='Salvar' />

                    <Button 
                    className={styles.delete}
                    onClick={ () => routes.back()}
                    title='Excluir' />


            </Form>


        </div>

        </LayoutPortfolio>
    )
}

interface Props{
    work_id : string | string []
}


export const getServerSideProps : GetServerSideProps<Props> = async (ctx) =>{
    try{
        const {work_id} = ctx.query;


        return {
            props : {
                work_id : work_id,
            }
        }

    }catch(error){
        console.error(error)

        return {
            props : {
                work_id : null
            }
        }
    }
}


