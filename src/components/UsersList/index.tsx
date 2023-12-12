//utils 
import Router from 'next/router'
//styles
import styles from './styles.module.scss'
//components
import Image from 'next/image'
import { api } from '@/services/api'
//fonts
import { Roboto } from 'next/font/google'
//assets
import avatarUrl from '../../../public/avatarUrl.png'



interface User{
    id : number
    name: string, 
    ocupation : string
    img : string
}

interface UserListProps{
    users: User[],
    className? : string
}


const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] 
})



/* eslint-disable @next/next/no-img-element */

export default function UsersList({users, className, ...rest} : UserListProps){

    const avatar = (img : string) => {
        return img ? `${api.defaults.baseURL}/files/${img}` : avatarUrl
    }


    return(

    <div className={`${className} ${styles.main} ${roboto.className}`}>

    <div>

       
               {users  && users.map(user => (

                <div
                 onClick={() => Router.push(`/portfolio/${user.id}`)}
                 key={user.id}
                 className={styles.infoUser} >
                    <img 
                    src={`${avatar(user.img)}`}
                    alt='Imagem do usuário'
                    />

                    <div>
                    <h1>{user.name}</h1>    
                    <p>{user.ocupation}</p>
                    </div>

                </div>    

                    ))}
        </div>
    </div>
    )
}