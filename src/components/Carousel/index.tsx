//styles
import styles from './styles.module.scss'

//components
import ProjectCards from '../ProjectCards'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from 'swiper/modules';
import { GetServerSideProps } from 'next';
import { api } from '@/services/api';



export default function Carousel({data} ){


    console.log(data)
    return(
        <div className={styles.carouselContainer}>
        <Swiper
        touchRatio={0.5}
        speed={1000}
        slidesPerView={1.2}
        spaceBetween={60}
        modules={[ Navigation]}
        
     >
      {data && data.map(project => (
      <SwiperSlide key={project.id} className={styles.swiperContainer}  >
            <ProjectCards
            project={project}
             />
        </SwiperSlide>

      ))}  
      
      



        </Swiper>
        </div>

    )
}


