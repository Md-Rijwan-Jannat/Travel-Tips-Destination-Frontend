'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TravelSlider from '../../../ui/slider/travelSlider';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SectionTitle from '../../../ui/sectionTitle';

type DestinationCard = {
  name: string;
  rating: number;
  category: string;
  icon: string;
};

const destinations: DestinationCard[] = [
  {
    name: 'Paris',
    rating: 4.8,
    category: 'Romantic',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730020051/biqcntwxlfvnzphkmlte.jpg',
  },
  {
    name: 'Tokyo',
    rating: 4.7,
    category: 'Cultural',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730020052/opfgcvolcl0cm25zlm6t.jpg',
  },
  {
    name: 'Bali',
    rating: 4.9,
    category: 'Tropical',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730020051/odqp0vcuudklyothurgj.webp',
  },
  {
    name: 'New York',
    rating: 4.6,
    category: 'Urban',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730019901/ynesvr8puf9yqcm2dwdm.webp',
  },
  {
    name: 'Sydney',
    rating: 4.5,
    category: 'Adventure',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730019901/ztieup8qqnx3htswnhvy.webp',
  },
  {
    name: 'Cairo',
    rating: 4.3,
    category: 'Historical',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730019901/aegsgaspg0vbkpvqnr9y.webp',
  },
  {
    name: 'Rome',
    rating: 4.7,
    category: 'Historical',
    icon: 'https://res.cloudinary.com/dihqveqyc/image/upload/v1730019901/grer9wzwg0e5ijbed1le.jpg',
  },
  {
    name: 'Cape Town',
    rating: 4.6,
    category: 'Scenic',
    icon: 'https://www.shutterstock.com/image-photo/cape-town-city-centre-above-600nw-2453588923.jpg',
  },
];

const EssentialDestinationsSlider: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Adjust based on when you want the animation to trigger (0.1 = 10% visible)
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="bg-default-50 px-3 py-5 md:p-8 rounded-lg w-full my-10"
    >
      <SectionTitle text="Essential destinations" />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex flex-col items-start w-full lg:w-[40%]">
          <div className="space-y-3">
            <h2 className="text-default-800 text-2xl font-bold">
              Top Travel Destinations
            </h2>
            <p className="text-default-700">
              Discover must-visit spots and popular travel destinations
              worldwide.
            </p>
          </div>
          <Button
            as={Link}
            href="/destinations"
            className="bg-default-50 border border-pink-500 text-pink-500 font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white mt-10"
          >
            Explore All
          </Button>
        </div>

        <div className="w-full lg:w-[60%]">
          <TravelSlider destinations={destinations} />
        </div>
      </div>
    </motion.section>
  );
};

export default EssentialDestinationsSlider;
