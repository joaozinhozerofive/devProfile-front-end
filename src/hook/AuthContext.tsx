import { api } from '@/services/api';
import {createContext, useState, useEffect, useContext, ReactNode} from 'react'
import { toast } from 'react-toastify'
import Router from 'next/router';


interface SignInProps {
    email : string
    password : string
}


interface UserProps{
    id : string
    name : string
    email :  string 
    ocupation : string 
    password ? : string 
    about? : string
    token : string
    
}


interface DataProps {
    user? : UserProps
    token? :  string
}


interface AuthContextProps {
    data : DataProps
    signIn : (credentials : SignInProps) => Promise<void>
    signOut : () => void
}


interface AuthProviderProps{
    children : ReactNode
}


export const AuthContext = createContext({} as AuthContextProps)





export function AuthProvider({children} : AuthProviderProps){
    const [data, setData] = useState<DataProps>({})


    async function signIn({email, password} : SignInProps ){
          try{  



            const response =  await api.post("/sessions", {email, password})

            const {token, user} = response.data

            if(user && token){
                Router.push(`/portfolio/${user.id}`)

                localStorage.setItem("@devProfile:user",JSON.stringify(user))
                localStorage.setItem("@devProfile:token",(token))
            }

            setData({token, user})

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`


            toast.success("Login feito com sucesso")
            
        
        }
        catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else {
                toast.error("Não foi possível fazer login")
            }
        }

    }


    function signOut(){
        try{
            const confirm = window.confirm("Tem certeza que deseja sair?")

            if(confirm){
                setData({})
                localStorage.removeItem("@devProfile:token")
                localStorage.removeItem("@devProfile:user")

                Router.push("/")
            }

        }catch{
            toast.error("Não foi possível deslogar sua conta")
        }

    }


    useEffect(() => {
        const user = localStorage.getItem("@devProfile:user")
        const token = localStorage.getItem("@devProfile:token")


        api.defaults.headers.common['Authorization'] = `Bearer ${token}`


        setData({
            user : JSON.parse(user),
            token : token
        })


    }, [])
    

    


    return(

        <AuthContext.Provider value={{ data, signIn, signOut}}>

          {children}

        </AuthContext.Provider>
        

      )


      

}



export const useAuth = () =>{
    const context = useContext(AuthContext)   


    return context

}