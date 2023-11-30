//styles 
import styles from './styles.module.scss'


//icons
import { MdAddAPhoto } from "react-icons/md";



//assets
import exampleImage from '../../../../../public/exampleimagem.avif'


//components
import LayoutPortfolio from '@/components/Layout Portfolio'
import TextShadow from '@/components/TextShadow'
import Input from '@/components/Input'
import Form from '@/components/Form'
import Image from 'next/image'
import TagItem from '@/components/TagItem'
import Button from '@/components/Button'


export default function newProject(){
    return(
        <LayoutPortfolio className={styles.layout}>

<div className={styles.content}>
 
        <TextShadow
        className={styles.textshadow}
        title='Novo projeto' 
        />



    <Form className={styles.editProjects}>


            <label>
                Nome do projeto
                <Input 
                placeholder='Ex.: Loja de roupas'
                className={styles.input}
                type='text' />

            </label>


            <div className={styles.projectImg}>
                <Image
                src={exampleImage} 
                alt='Imagem do projeto' />


        <div 
        className={styles.newImage}
        >

        <Input
        className={styles.input} 
        type='file'/>

        <MdAddAPhoto size = {20} className = {styles.iconImage}/>

        </div>



            </div>


            <label>
                Descrição do projeto
                
                <textarea placeholder='Seja breve, escreva as funcionalidades e como funciona o projeto'></textarea>

            </label>
            
            <label>
                Tecnologias usadas
                    <TagItem
                    />
                    <TagItem
                    isNew 
                    placeholder='Adicionar'
                    />

            </label>


            <label>
                Link do projeto
                <Input
                placeholder='Cole o link do seu projeto'
                className={styles.input}
                type='text'/>
            </label>


            <Button
            isLoading = {true}
            title='Salvar' />

    </Form>
</div>

</LayoutPortfolio>
    )
}