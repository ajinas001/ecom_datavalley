import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

function Carousal() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/womens-dresses?limit=5')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch products:', err);
                setLoading(false);
            });
    }, []);

    const truncate = (str, n) => str.length > n ? str.slice(0, n) + '...' : str;

    const SkeletonSlide = () => (
        <div className="flex lg:mb-12 py-20 px-20 justify-between items-center sm:m-5 md:mx-32 md:mt-6 flex-wrap rounded-2xl shadow-xl relative animate-pulse h-[550px]">
            <div className='w-full md:w-[55%] space-y-4'>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-2/3 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-10 w-44 bg-gray-300 rounded mt-6"></div>
            </div>
            <div className="lg:w-[45%] mt-6 lg:mt-0">
                <div className="w-[80%] h-64 bg-gray-300 rounded-xl mx-auto"></div>
            </div>
        </div>
    );

    return (
        <>
            <style>
                {`
                .swiper-pagination-bullet {
                    width: 0.5rem;
                    height: 0.5rem;
                    background-color: #718096;
                    opacity: 0.5;
                    border-radius: 50%;
                    margin: 0 0.5rem;
                    margin-top: 4rem;
                }
                .swiper-pagination-bullet-active {
                    background-color: #000;
                    opacity: 1;
                }
                .swiper-pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20rem;
                }
            `}
            </style>

            <div className="swiper-container mb-8">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            className="mySwiper"
                        >
                            {[1, 2, 3].map((_, index) => (
                                <SwiperSlide key={index}>
                                    <SkeletonSlide />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="mySwiper"
                    >
                        {products.map((prod, index) => (
                            <SwiperSlide key={index}>
                                <section
                                    className='flex lg:mb-12 py-20 px-20 justify-between items-center sm:m-5 md:mx-32 md:mt-6 flex-wrap rounded-2xl shadow-xl relative'
                                    data-aos='fade-down'
                                >
                                    <div className='w-full md:w-[55%]'>
                                        <h6 className='text-primary font-bold'>UP TO 50%</h6>
                                        <h1 className='text-4xl text-primary sm:text-6xl font-bold mb-5 mt-5 flex-wrap'>
                                            {prod.title}
                                        </h1>
                                        <p className='text-secondary mb-8'>
                                            {truncate(prod.description, 100)}
                                        </p>

                                        <a
                                            href={`/productDetails/${prod.id}`}
                                            className="group mt-auto mb-8 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-primary px-6 py-2 text-white transition"
                                        >
                                            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                                                Explore now
                                            </span>
                                            <svg
                                                className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className='lg:w-[45%]'>
                                        <img
                                            src={prod.images[0]}
                                            alt={prod.title}
                                            className='lg:w-[80%] lg:h-[80%] rounded-xl'
                                        />
                                    </div>
                                </section>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </>
    );
}

export default Carousal;
