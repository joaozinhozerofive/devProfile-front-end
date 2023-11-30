//styles
import styles from './styles.module.scss'


//icons
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from 'react-icons/ci';
import { GrGithub } from 'react-icons/gr';



//components
import Input from '@/components/Input'
import LayoutPortfolio from '@/components/Layout Portfolio'
import ButtonText from '@/components/Button'
import Button from '@/components/Button'
import TextShadow from '@/components/TextShadow'
import Form from '@/components/Form';

//fonts 
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';






export default function Edit(){
    const routes = useRouter()

    const {id} = routes.query;
    return(
        <LayoutPortfolio className={styles.layout}>


        <div className={styles.content}>

                <TextShadow 
                className={styles.textShadow} 
                title='Editar - Links' />

                
                <Form className={styles.formEdit}>

                    <label>
                        WhatsApp
                        <Input
                        icon={FaWhatsapp}
                        placeholder='https://wa.me/(seu número de WhatsApp)'
                        className={styles.input}
                         type='text' />
                    </label>

                    <label>
                        Linkedin
                        <Input
                        icon={CiLinkedin}
                        placeholder='https://www.linkedin.com/in/usuario-9674541a3/'
                        className={styles.input}
                        type='text' />
                    </label>
                    <label>

                        Github
                        <Input
                        icon={GrGithub}
                        placeholder='https://github.com/(seu nome de usuário)'
                        className={styles.input}
                        type='text' />
                    </label>

                </Form>

                <Button 
                onClick={ () => routes.push(`/portfolio/${id}/edit/about`)}
                title='Próximo' />
            </div>

            

        </LayoutPortfolio>
    )
}







