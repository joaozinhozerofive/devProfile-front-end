//styles 
import styles from './styles.module.scss'



//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import Form from '@/components/Form'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Button from '@/components/Button'



export default function newWork(){
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
                        type='text'
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
                        className={styles.input}
                        placeholder='20/12/2023'
                        type='date'
                        />

                    </label>


                    <label>
                        Término

                        <Input
                        className={styles.input}
                        placeholder='20/12/2023'
                        type='date'
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
                isLoading = {true}
                title='Salvar'
                />


            </Form>


        </div>

        </LayoutPortfolio>
    )
}