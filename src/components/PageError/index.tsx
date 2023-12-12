//utils
import { useRouter } from 'next/router'
//styles 
import styles from './styles.module.scss'
//components
import Button from '../Button'
import ButtonText from '../ButtonText'
//fonts 
import { Poppins } from 'next/font/google'
import { IoArrowBack } from 'react-icons/io5'


const poppins = Poppins({
    subsets : ['latin'], 
    weight : ['400']
})




export default function PageError(){
    const routes = useRouter()
    const {id} = routes.query





    return (
        <div className={`${styles.content} ${poppins.className}`}>
            <ButtonText 
            onClick={() => routes.back()}
            icon={IoArrowBack}
            title='Voltar'/>
            <div>


            <h1>Error:  <span>404</span></h1>
            <p>Você não tem autorização para entrar nesta página</p>
            <Button
            onClick={() => routes.push("/")}
            title='Voltar para a página de login'
             />

                
            </div>

        </div>
    )
}