//styles
import styles from './styles.module.scss'


//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function EditAbout(){
    const routes = useRouter()

    const {id} = routes.query 
    return(
        <LayoutPortfolio className={styles.layout}>

            <div className={styles.content}>

                <TextShadow
                className={styles.texshadow}
                title='Editar - Sobre'
                 />

                    <Form className={styles.formEdit}>
                        <h1>Escreva sobre você</h1>
                        <textarea>
                        </textarea>

                    </Form>

                    <Button 
                    onClick={ () => routes.push(`/portfolio/${id}/edit/skills`)}
                    title='Próximo' />


            </div>


        </LayoutPortfolio>
    )
}