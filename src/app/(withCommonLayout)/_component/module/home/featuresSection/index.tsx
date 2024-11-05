'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  FaGoogle,
  FaShopify,
  FaSquare,
  FaYoutube,
  FaTwitter,
  FaSpotify,
} from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../../../ui/sectionTitle';
import { useRef } from 'react';

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <>
      <SectionTitle text="Features" />
      <div ref={sectionRef} className="my-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          className="w-full mx-auto text-center mb-8"
        >
          <Button
            as={Link}
            href="/pricing"
            className="px-4 py-2 bg-pink-300 text-pink-700 rounded-full font-semibold"
          >
            Explore all plans
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-default-50 rounded-lg p-6 shadow-md text-center"
          >
            <div className="flex justify-center gap-4 mb-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <FaGoogle className="text-5xl text-default-400" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <FaShopify className="text-5xl text-green-500" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <FaSquare className="text-5xl text-black" />
              </motion.div>
            </div>
            <p className="text-default-700">
              Connect effortlessly with tools and services that enhance your
              travel planning experience.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-default-50 rounded-lg p-6 shadow-md text-center"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-pink-200 px-3 py-2 rounded-full"
              >
                <FaYoutube className="text-pink-700" />
                <div className="w-10 h-2 bg-pink-400 rounded-full"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-pink-200 px-3 py-2 rounded-full"
              >
                <FaTwitter className="text-pink-700" />
                <div className="w-10 h-2 bg-pink-400 rounded-full"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-pink-200 px-3 py-2 rounded-full"
              >
                <FaSpotify className="text-pink-700" />
                <div className="w-10 h-2 bg-pink-400 rounded-full"></div>
              </motion.div>
            </div>
            <p className="text-default-700">
              Personalize your profile to reflect your travel style and inspire
              others.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-default-50 rounded-lg p-6 shadow-md text-center"
          >
            <div className="flex justify-center gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-teal-500 text-default-50 rounded-lg size-14 flex items-center justify-center text-xl p-2"
              >
                15
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-200 text-default-900 rounded-full size-14 flex items-center justify-center text-xl p-2"
              >
                Mar
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500 text-default-50 rounded-lg size-14 flex items-center justify-center text-xl p-2"
              >
                3am
              </motion.div>
            </div>
            <p className="text-default-700">
              Schedule and share your travel tips, updates, and recommendations
              anytime, anywhere.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
