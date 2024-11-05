'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SectionTitle from '../../../ui/sectionTitle';

type CardData = {
  title: string;
  description: string;
  imgUrl: string;
};

const cardsData: CardData[] = [
  {
    title: 'Earth 2.0',
    description:
      'Exploring sustainable solutions to build a better future for our planet.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/earth.png',
  },
  {
    title: 'Muzisca',
    description:
      'Bringing harmony to life with music that transcends boundaries.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/muszica.png',
  },
  {
    title: 'Atica Co',
    description: 'Innovating in digital solutions to drive businesses forward.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/atica.png',
  },
  {
    title: 'Fox Hub',
    description:
      'Your ultimate platform for smart investments and financial growth.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/fox-hub.png',
  },
  {
    title: 'Asgardia',
    description:
      'A visionary project focused on space exploration and human advancement.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/asgardia.png',
  },
  {
    title: 'Tower',
    description:
      'Building skyscrapers and landmark structures for modern cities.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/tower.png',
  },
  {
    title: 'Aven',
    description:
      'Nature-inspired solutions for a sustainable and eco-friendly lifestyle.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/aven.png',
  },
  {
    title: 'Leaf',
    description:
      'Promoting green practices to preserve our planet’s natural resources.',
    imgUrl:
      'https://template.creativemox.com/uptrend/wp-content/uploads/sites/26/2024/06/leaf.png',
  },
];

const OurService: React.FC = () => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div ref={sectionRef}>
      <SectionTitle text="Our Service" />
      <div className="mt-10">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              className="bg-default-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-default-200/90"
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={card.imgUrl}
                alt={card.title}
                className="w-16 h-16 mb-4"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-default-700 mb-4">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurService;
