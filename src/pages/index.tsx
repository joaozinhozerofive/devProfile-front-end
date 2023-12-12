//utils
import Head from 'next/head'
import { Poppins, Turret_Road } from 'next/font/google'
import { useAuth } from '../hook/AuthContext';
import {useEffect, useState} from 'react'
import { api } from '@/services/api';
import Router from 'next/router';
//styles
import styles from '../styles/Home.module.scss'
//componentes
import Input from '@/components/Input'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import UsersList from '@/components/UsersList';
import Link from 'next/link';
//icons
import {FiSearch} from 'react-icons/fi'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";






 

const poppins = Poppins({
   weight: ['400'], 
   style : ['normal'],
   subsets : ['latin'] // obrigatório
  })


  
  export default function Home() {
    const {signIn} = useAuth();


    const [users, setUsers] = useState([]);
    const [inputLoading, setInputLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)



    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [search, setSearch] = useState<string>()


    useEffect(() =>{
      async function fetchUsers(){
        setInputLoading(true)
        const response = await api.get(`/users?name=${search}`)
        const data = response.data

        setUsers(data);

        setTimeout(() => {
          setInputLoading(false)

        }, 500)



      }

      fetchUsers()
    }, [search])
  
    function login(){

      try{
      setButtonLoading(true)


      signIn({email, password})
        
      }finally{

        setTimeout(() =>{
          setButtonLoading(false)
        }, 700)
      }

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
        onChange={(e) => setSearch(e.target.value)}
        icon={FiSearch}
        placeholder='Pequise pelo nome do usuário'
        isLoading= {inputLoading}
        type='text'/>

         <div className={`${styles.userList}`}>
          {users && search ?   (
            <UsersList users={users}/>
          ) : ""
        }
          </div>
      </div>

      <div className={styles.signIn}>

        <h1>Faça login</h1>

        <label htmlFor="email">

            <p>Email</p>

            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={AiOutlineMail}
            placeholder='Ex.: user@email.com'
            type='email'/>

        </label>     

        <label htmlFor="password">
            <p>Senha</p>

            <Input
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            icon={RiLockPasswordLine}
            placeholder='No mínimo 6 caracteres'
            type='password'/>

        </label>
          <Button
          isLoading = {buttonLoading}
          onClick={() => login()}
          title='Entrar' />

          <h1 onClick={() => Router.push("/register")}>Crie seu portifólio</h1>
      </div>

      </main>


      <Footer />


    </div>
    </>
  )
}
