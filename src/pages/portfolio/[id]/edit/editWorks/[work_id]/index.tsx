//utils 
import {useState, ChangeEvent, useEffect} from 'react'
import { useRouter } from 'next/router'


//styles 
import styles from './styles.module.scss'



//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import Form from '@/components/Form'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Button from '@/components/Button'





export default function EditWork(){
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

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
    

   


    const routes = useRouter()
    const {id} = routes.query;

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
                        className={styles.input}
                        placeholder='Ex.: Rio do Sul'
                        type='string'
                        />

                    </label>
                    <label>
                        UF
                        <Input
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
                        onChange={(e : ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
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
                        onChange={(e : ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
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
                        id='checkbox'
                        type="checkbox" />

                    </label>

                <label>
                        Descrição da atividade

                        <textarea placeholder='Ex.: Assistente financeiro - conferência de balancetes, etc..'></textarea>

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