'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TravelSlider from '../../../ui/slider/travelSlider';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SectionTitle from '../../../ui/sectionTitle';
import { destinations } from '@/src/lib/data';

export type TDestinationCard = {
  id: string;
  name: string;
  rating: number;
  category: string;
  icon: string;
  description: string;
  longDescription: string;
  bestSeason: string;
  highlights: string[];
  activities: string[];
  averageCost: string;
};

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
            className="secondary-button mt-10"
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
