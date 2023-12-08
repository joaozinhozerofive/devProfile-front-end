
//utils 
import Router from 'next/router'

//assets
import avatarUrl from '../../../public/avatarUrl.png'
import Image from 'next/image'


//fonts
import { Roboto } from 'next/font/google'

//styles
import styles from './styles.module.scss'

//interfaces
interface User{
    id : number
    name: string, 
    ocupation : string
}

interface UserListProps{
    users: User[],
    className? : string
}


//variáveis
const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] 
})

export default function UsersList({users, className, ...rest} : UserListProps){

    return(

    <div className={`${className} ${styles.main} ${roboto.className}`}>

    <div>

       
               {users  && users.map(user => (

                <div
                 onClick={() => Router.push(`/portfolio/${user.id}`)}
                 key={user.id}
                 className={styles.infoUser} >

                    <h1>{user.name}</h1>    
                    <p>{user.ocupation}</p>

                </div>    

                    ))}
        </div>
    </div>
    )
}