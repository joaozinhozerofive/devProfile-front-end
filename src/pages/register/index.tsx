import Head from 'next/head'
import { Poppins } from 'next/font/google'

//icons
import {FiSearch} from 'react-icons/fi'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdComputer } from "react-icons/md";



import styles from './styles.module.scss'

//componentes
import Input from '@/components/Input'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import UsersList from '@/components/UsersList';
 

const poppins = Poppins({
   weight: ['400'], 
   style : ['normal'],
   subsets : ['latin'] // obrigatório
  })


  
  export default function Home() {
  const user = {
    username : "joaozerofive", 
    biography : "Entusiasta em programação com mais de 2 anos de experiência que busca novas oportunidades no mercado de trabalho."
  }
  return (
    <>

      <Head>
        <title>Dev Profile -  Cadastro </title>
      </Head>


      <div className={styles.page}>


      <main className={`${poppins.className} ${styles.main} `}>

    

      <div className={`${styles.inputWithList}`} >
        <Input
        icon={FiSearch}
        placeholder='Pequise pelo nome do usuário'
        isLoading= {true}
        type='text'/>

         <div className={`${styles.userList}`}>
            <UsersList user={user}/>
            <UsersList user={user}/>
            <UsersList user={user}/>
            <UsersList user={user}/>
            <UsersList user={user}/>
            <UsersList user={user}/>
          </div>
      </div>

    <div className={styles.signUp}>

        <h1>Crie seu portifólio</h1>

              <label htmlFor="username">
                <p>Nome Completp</p> 
                  <Input
                  id='username'
                  icon={CgProfile}
                  placeholder='John Doe'
                  type='text'/>
              </label>


              <label htmlFor="email">
                <p>Email</p> 
                  <Input
                  id='email'
                  icon={AiOutlineMail}
                  placeholder='Ex.: usuário@email.com'
                  type='email'/>
              </label>

              <label htmlFor="password">
                <p>Senha</p> 
                  <Input
                  id='password'
                  icon={RiLockPasswordLine}
                  placeholder='No mínimo 6 caracteres'
                  type='password'/>
              </label>

              <label htmlFor="ocupation">
                <p>Ocupação</p> 
                  <Input
                  id='ocupation'
                  icon={MdComputer}
                  placeholder='Ex.: Web Developer'
                  type='text'/>
              </label>

                <Button
                isLoading = {true}
                title='Entrar' />

          <h1>Já sou usuário</h1>

    </div>
      
     


      </main>
      
      <Footer className={styles.footerHome} />
    </div>
    </>
  )
}
