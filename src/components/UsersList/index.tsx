import avatarUrl from '../../../public/avatarUrl.png'
import Image from 'next/image'


//fonts
import { Roboto } from 'next/font/google'

//styles
import styles from './styles.module.scss'

//interfaces
interface User{
    username: string, 
    image? : string, 
    biography? : string
}

interface UserListProps{
    user: User,
    className? : string
}


//variáveis
const roboto = Roboto({
    weight: ['400'], 
    style : ['normal'],
    subsets : ['latin'] 
})

export default function UsersList({user, className, ...rest} : UserListProps){
    return(

            <div className={`${className} ${styles.main} ${roboto.className}`}>
                <Image 
                width={50}
                height={50}
                className={styles.imageList} 
                src={user.image ? user.image : avatarUrl} 
                alt='Imagem do usuário' />
            <div>

                    <h1>{user.username}</h1>
                    <p>{user.biography}</p>

        </div>

        

    </div>
    )
}