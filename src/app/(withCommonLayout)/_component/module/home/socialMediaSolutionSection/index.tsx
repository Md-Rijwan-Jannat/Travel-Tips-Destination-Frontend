'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SectionTitle from '../../../ui/sectionTitle';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const SocialMediaSolutionSection: React.FC = () => {
  // Set up intersection observer for both sides
  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <SectionTitle text="Go On" />
      <motion.section className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r bg-default-50 rounded-lg p-8 lg:p-12 space-y-8 lg:space-y-0 mt-10">
        {/* Left Side - Large Image with Badge */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -150 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
        >
          {/* Large Image */}
          <div className="relative w-[300px] lg:w-[400px] overflow-hidden rounded-lg border-[5px]">
            <Image
              src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/social-media-addiction.jpg"
              alt="Social Media Platform"
              width={400}
              height={500}
              className="object-cover"
            />
          </div>
          {/* Experience Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-6 right-6 bg-white px-6 py-6 rounded-full shadow-lg flex items-center space-x-2"
          >
            {leftInView && ( // Conditionally render CountUp when in view
              <CountUp
                className="text-xl font-bold text-pink-500"
                end={12}
                duration={2.5}
                separator=","
                prefix="+"
              />
            )}
            <span className="text-gray-600 text-xs">YEAR EXPERIENCE</span>
          </motion.div>
          {/* Circular Image Overlay */}
          <div className="absolute bottom-32 right-10 size-32 lg:size-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/cheerful-man-and-woman-with-laptops-pointing.jpg"
              alt="Happy Traveler"
              width={128}
              height={128}
              className="object-cover size-32 lg:size-48"
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 150 }} // Starts from right
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
        >
          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold text-default-800">
            Sharing <span className="text-pink-500">Travel Tips</span> and{' '}
            <br />
            Destination Guides!
          </h2>
          {/* Description */}
          <p className="text-default-800 text-sm lg:text-base">
            Discover incredible destinations, insider travel tips, and advice
            from experienced explorers. Join our community to plan unforgettable
            journeys and connect with fellow travelers.
          </p>

          {/* Feature List */}
          <div className="flex flex-col md:flex-row md:gap-5 border-y border-default-200 py-3">
            <div className="space-y-2 text-default-800 text-sm lg:text-base">
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Expert travel
                tips and guides.
              </p>
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Inspiration for
                unique destinations.
              </p>
            </div>
            <div className="space-y-2 text-default-800 text-sm lg:text-base">
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Community-driven
                recommendations.
              </p>
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Tips for
                budget-friendly travel.
              </p>
            </div>
          </div>

          {/* Profile and Button */}
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            {/* Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/cheerful-man-and-woman-with-laptops-pointing.jpg"
                  alt="Maggie Wilson"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="text-default-800 text-sm">
                <span className="block font-semibold">Maggie Wilson</span>
                <span>CEO, HEAD DIRECTOR</span>
              </div>
            </div>
            {/* Button */}
            <Button
              as={Link}
              href="/about"
              className="bg-default-50 border border-pink-500 text-pink-500 font-semibold px-4 py-3 rounded-full transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
            >
              More About Us
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default SocialMediaSolutionSection;
