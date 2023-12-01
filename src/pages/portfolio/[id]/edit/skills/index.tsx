//styles 
import styles from './styles.module.scss'

//assets
import exampleImage from "../../../../../../public/exampleimagem.avif"

//icons




//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Form from '@/components/Form'
import TagItem from '@/components/TagItem'
import Carousel from '@/components/Carousel'
import { useRouter } from 'next/router'


export default function EditSkills(){
    const routes = useRouter()
    const {id}   = routes.query as { id : string | number}

    return(
        <LayoutPortfolio className={styles.layout}>

                <div className={styles.content}>

                    <TextShadow
                    className={styles.textshadow}
                    title='Editar - habilidades' 
                    />


                    <Form className={styles.editTechnologies}>

                        <label>
                        
                            Tecnologias
                            <div className={styles.technologies}>
                                <TagItem
                                />

                                <TagItem
                                isNew 
                                placeholder='Adicionar'
                                />

                            </div>

                        </label>


                    </Form>


            </div>

            
            <Carousel />

            <Button 
            onClick={ () => routes.push(`/portfolio/${id}/edit/work`)}
            title='Próximo' />     
             
                    
                

        </LayoutPortfolio>
    )
}

