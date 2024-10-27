'use client';

import React, { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import SwiperCore from 'swiper';

type DestinationCard = {
  name: string;
  rating: number;
  category: string;
  icon: string;
};

interface TravelSliderProps {
  destinations: DestinationCard[];
}

const TravelSlider: FC<TravelSliderProps> = ({ destinations }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-end gap-3">
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowBack />}
          onClick={handlePrevSlide}
          className="bg-default-200 p-2 rounded-full text-pink-500"
        />
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowForward />}
          onClick={handleNextSlide}
          className="bg-default-200 p-2 rounded-full text-pink-500"
        />
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="my-5"
      >
        {destinations.map((destination, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="bg-default-50 rounded-lg md:m-5 p-4 flex flex-col items-center cursor-pointer w-[140px] md:w-full border border-default-100"
            >
              <Image
                width={500}
                height={500}
                src={destination.icon}
                alt={`${destination.name} icon`}
                className="w-[100px] h-[60px] mb-4"
              />
              <h3 className="text-default-800 font-semibold">
                {destination.name}
              </h3>
              <div className="text-warning mt-2 text-sm">
                {destination.rating} ★
              </div>
              <div className="text-default-800 font-medium mt-1">
                {destination.category}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TravelSlider;