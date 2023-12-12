//utils
import Head from 'next/head'
import { Poppins } from 'next/font/google'
import { useEffect } from 'react';
import { api } from '@/services/api';
import { useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify'
//styles
import styles from './styles.module.scss'
//componentes
import Input from '@/components/Input'
  
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import UsersList from '@/components/UsersList';
//icons
import {FiSearch} from 'react-icons/fi'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdComputer } from "react-icons/md";




 

const poppins = Poppins({
   weight: ['400'], 
   style : ['normal'],
   subsets : ['latin'] // obrigatório
  })


  
  export default function Home() {
    const [users, setUsers] = useState([]);
    const [inputLoading, setInputLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [ocupation, setOcupation] = useState<string>("")

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


    async function handleSignUp(){
      setButtonLoading(true)
      try{

        await api.post("/users", {name, email, password, ocupation})

        toast.success("Usuário cadastrado com sucesso!")

        Router.push("/")

      }catch(error){
        if(error.response.data.message){
          toast.error(error.response.data.message)
      }else{
        toast.error("Não foi possível concluir o seu cadastro")
      }
    }finally{

      setTimeout(() =>{
      setButtonLoading(false)

      }, 500)

      }

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
        onChange={(e) => setSearch(e.target.value)}
        icon={FiSearch}
        placeholder='Pequise pelo nome do usuário'
        isLoading= {inputLoading}
        type='text'/>

         <div className={`${styles.userList}`}>
         {users && search ? (
            <UsersList users={users}/>
          ) : ""
        }
          </div>
      </div>

    <div className={styles.signUp}>

        <h1>Crie seu portifólio</h1>

              <label htmlFor="username">
                <p>Nome Completo</p> 

                  <Input
                  onChange={(e) => setName(e.target.value)}
                  id='username'
                  icon={CgProfile}
                  placeholder='John Doe'
                  type='text'/>

              </label>


              <label htmlFor="email">
                <p>Email</p> 

                  <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  icon={AiOutlineMail}
                  placeholder='Ex.: usuário@email.com'
                  type='email'/>

              </label>

              <label htmlFor="password">

                <p>Senha</p> 

                  <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  icon={RiLockPasswordLine}
                  placeholder='No mínimo 6 caracteres'
                  type='password'/>

              </label>

              <label htmlFor="ocupation">

                <p>Ocupação</p> 

                  <Input
                  onChange={(e) => setOcupation(e.target.value)}
                  id='ocupation'
                  icon={MdComputer}
                  placeholder='Ex.: Web Developer'
                  type='text'/>

              </label>

                <Button
                onClick={() => handleSignUp()}
                isLoading = {buttonLoading}
                title='Criar' />

          <h1 onClick={() => Router.push("/")}>Já sou usuário</h1>

    </div>
      
     


      </main>
      <Footer />
    </div>
    </>
  )
}