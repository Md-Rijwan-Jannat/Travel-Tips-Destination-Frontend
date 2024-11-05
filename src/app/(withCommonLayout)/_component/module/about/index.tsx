'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AboutUsFeatures from './aboutUsFeatures';
import TeamSection from './teamSection';

export default function About() {
  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-10 h-[60vh] mx-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-default-700 flex items-center justify-center my-2 text-xs">
          <Link href={'/'}>Home</Link> &gt; About Us
        </p>
        <Image
          className="w-[340px] md:w-[400px]"
          src={
            'https://uigaint.com/demo/html/staco_i/assets/images/shape/breadcrumb-img.svg'
          }
          width={500}
          height={500}
          alt="doc image"
        />
      </div>

      <AboutUsFeatures />

      <TeamSection />

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="bg-default-50 bg-opacity-15 shadow rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-500">
            Our Mission
          </h2>
          <p className="text-default-700">
            To inspire and empower travelers to discover new places, cultures,
            and experiences while fostering a sense of community and support
            among fellow explorers.
          </p>
        </motion.div>

        <motion.div
          className="bg-default-50 bg-opacity-15 shadow rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-500">
            Our Values
          </h2>
          <p className="text-default-700">
            We value diversity, respect for the environment, and the joy of
            discovering new adventures. Our community thrives on shared
            experiences and knowledge.
          </p>
        </motion.div>

        <motion.div
          className="bg-default-50 bg-opacity-15 shadow rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-500">Join Us</h2>
          <p className="text-default-700">
            Become part of our growing community! Share your travel stories,
            connect with like-minded individuals, and let’s explore the world
            together.
          </p>
        </motion.div>
      </div>

      <motion.p
        className="text-center text-default-50 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Thank you for being a part of our journey. Happy travels!
      </motion.p>
    </div>
  );
}
