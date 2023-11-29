import Head from 'next/head'
import { Poppins } from 'next/font/google'

//icons
import {FiSearch} from 'react-icons/fi'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import styles from '../styles/Home.module.scss'
import backgroundIMg  from '../../public/backgroundImgHome.jpg'

//componentes
import Input from '@/components/Input'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import UsersList from '@/components/UsersList';
import Link from 'next/link';
 

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
        <title>Dev Profile</title>
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

      <div className={styles.signIn}>

        <h1>Faça login</h1>

        <label htmlFor="email">
            <p>Email</p>
            <Input
            icon={AiOutlineMail}
            placeholder='Ex.: user@email.com'
            type='email'/>
        </label>     

        <label htmlFor="password">
            <p>Senha</p>
            <Input
            icon={RiLockPasswordLine}
            placeholder='No mínimo 6 caracteres'
            type='password'/>
        </label>
          <Button
          isLoading = {true}
          title='Entrar' />

          <h1>Crie seu portifólio</h1>
      </div>

      </main>


      <Footer className={styles.footerHome}  />
    </div>
    </>
  )
}
