import './Home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import slider1 from '../../assets/images/hero-1.jpg'
import slider2 from '../../assets/images/hero-2.jpg'
import slider3 from '../../assets/images/hero-3.jpg'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
const Home = () => {
  return (
    <>
      <div className='banner'>
        <Swiper
          className='hero-sliders'
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}>
          <SwiperSlide className='swiper-slides'>
            <div className='item'>
              <img src={slider1} alt='' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slides'>
            <div className='item'>
              <img src={slider2} alt='' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slides'>
            <div className='item'>
              <img src={slider3} alt='' />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Home
