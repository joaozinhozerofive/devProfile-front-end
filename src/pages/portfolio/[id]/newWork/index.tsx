//utils 
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
//styles 
import styles from './styles.module.scss'
//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import Form from '@/components/Form'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
import { useAuth } from '@/hook/AuthContext'
import PageError from '@/components/PageError'




export default function EditWork(){
    const [companyName, setCompanyName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [FU, setFU] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [isCurrent, setIsCurrent] = useState<boolean>(false)
    const[readOnly, setReadOnly] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

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


    function handleChecked(){


        if(endDate === 'Emprego atual'){
            setIsCurrent(false)
            setReadOnly(false)
            setEndDate("")
        }

        if(isCurrent === false){
            setIsCurrent(true)
            setReadOnly(true)
            setEndDate('Emprego atual')
        }
        

        
        
    }



    async function handleNewWork(){
        setButtonLoading(true)
        try{


            await api.post('/experience', {companyName, city, FU, startDate, endDate, description})

            toast.success("Experiência criada com sucesso!")

            routes.back()

        }catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Não foi possível criar esta experiência")
            }
        }finally{
            
            setTimeout(()=>{

             setButtonLoading(false)

            }, 500)
        }
    }
    

   


    const routes = useRouter()
    const {id} = routes.query;

    const {user_id} =  useAuth();

    const userIdMatched = user_id === Number(id)

    if(!userIdMatched){
        return (
            <PageError />
        )
    }

    return (

<>
<Head>
    <title>Dev Profile - Nova Experiência</title>
</Head>
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
                        readOnly = {readOnly}
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
                        onChange={(e) => handleChecked()}
                        id='checkbox'
                        type="checkbox" />

                    </label>

                <label>
                        Descrição da atividade

                        <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Ex.: Assistente financeiro - conferência de balancetes, etc..'></textarea>

                    </label>



                    <Button
                    onClick={ () => handleNewWork()}
                    title='Salvar' />

                   


            </Form>


        </div>

</LayoutPortfolio>
</>        


    )
}