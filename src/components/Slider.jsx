import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaArrowRightLong } from "react-icons/fa6";

// Slider Images
import slide1 from '../assets/slider1.jpg';
import slide2 from '../assets/slider2.jpg';
import slide3 from '../assets/slider3.jpg';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className='h-[500px]'
            >
                <SwiperSlide style={{
                    backgroundImage: `url(${slide3})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.83)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20 space-y-3">
                        <h3 className='text-white text-4xl md:text-[40px] font-semibold'>Enhance Your Skills And <span className='text-indigo-600'>Ability</span></h3>
                        <p className='text-gray-300 text-lg w-11/12 sm:w-10/12 lg:w-8/12 mx-auto'>
                            Online group study provides an opportunity for students to come together virtually and tackle academic challenges as a team. By collaborating with others, you can gain fresh perspectives, share knowledge, and enhance your understanding of the material.
                        </p>
                        <Link to='/assignments' className='bg-indigo-700 flex  items-center gap-2 tracking-wide hover:text-indigo-500 hover:bg-transparent duration-300 border-2 border-indigo-700 text-gray-200 px-4 py-2 rounded'>Explore Assignments <FaArrowRightLong />
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `url(${slide2})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.83)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full space-y-3 flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20">
                        <h3 className='text-white text-4xl md:text-[40px] font-semibold'>Join Collaborative <span className='text-indigo-600'>Learning</span></h3>
                        <p className='text-gray-300 text-lg w-11/12 sm:w-10/12 lg:w-8/12 mx-auto'>
                            Participating in online group study sessions is not just about reviewing course materials. It’s also about developing valuable skills such as teamwork, communication, and problem-solving. As you work with your peers, you’ll learn how to effectively.
                        </p>
                        <Link to='/assignments' className='bg-indigo-700 flex  items-center gap-2 tracking-wide hover:text-indigo-500 hover:bg-transparent duration-300 border-2 border-indigo-700 text-gray-200 px-4 py-2 rounded'>Explore Assignments <FaArrowRightLong />
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `url(${slide1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.83)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full space-y-3 flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20">
                        <h3 className='text-white text-4xl md:text-[40px] font-semibold'>Achieve Your <span className='text-indigo-600'>Goals</span></h3>
                        <p className='text-gray-300 text-lg w-11/12 sm:w-10/12 lg:w-8/12 mx-auto'>
                            Setting academic goals and achieving them is much easier when you have a group of motivated peers to support you. Online group study encourages accountability, making it easier to stay on track with deadlines and progress. With collaborative tools.
                        </p>
                        <Link to='/assignments' className='bg-indigo-700 flex  items-center gap-2 tracking-wide hover:text-indigo-500 hover:bg-transparent duration-300 border-2 border-indigo-700 text-gray-200 px-4 py-2 rounded'>Explore Assignments <FaArrowRightLong />
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
