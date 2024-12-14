'use client';

import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaGooglePlay, FaApple } from 'react-icons/fa';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * StatsSection component
 *
 * This component renders a section on the homepage
 * containing a brief description of the product,
 * a grid of statistics, and a call to action to
 * download the app.
 *
 * @returns {React.ReactElement}
 */
/******  ef92ff5b-1520-4213-a69b-2209f21c57e3  *******/
const StatsSection: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto py-10 px-5 grid md:grid-cols-2 gap-6 lg:gap-10">
      {/* Left Block */}
      <motion.div
        className="flex flex-col justify-center bg-primaryPink rounded-xl p-6 shadow-lg"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-3">What We Do?</h3>
        <p className="text-lg text-gray-700">
          Consequatur exercitation deserunt consectetur blanditiis, placeat.
        </p>
        <a
          href="#"
          className="mt-4 text-darkPink underline hover:text-pink-700 transition duration-200"
        >
          Learn More →
        </a>
      </motion.div>

      {/* Stats Block */}
      <div className="grid grid-cols-1 gap-6">
        {/* Stat 1 */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
          variants={fadeIn}
        >
          <FaUsers className="text-darkPink text-3xl mr-4" />
          <div>
            <h4 className="text-2xl font-bold">25K+</h4>
            <p className="text-gray-600">Trusted Active Users</p>
          </div>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
          variants={fadeIn}
        >
          <FaStar className="text-darkPink text-3xl mr-4" />
          <div>
            <h4 className="text-2xl font-bold">8M+</h4>
            <p className="text-gray-600">(4.5 rating) Happy Customers</p>
          </div>
        </motion.div>
      </div>

      {/* Download App Section */}
      <motion.div
        className="bg-primaryPink rounded-xl shadow-lg p-6 flex items-center space-x-4 md:col-span-2"
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.6 }}
        variants={fadeIn}
      >
        <img
          src="https://via.placeholder.com/100"
          alt="App Thumbnail"
          className="rounded-lg shadow-md w-24 h-24 object-cover"
        />
        <div>
          <h4 className="text-xl font-bold mb-2">
            Download Our App & Enroll Now!
          </h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-darkPink text-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2 hover:bg-pink-600 transition duration-300"
            >
              <FaGooglePlay />
              <span>Google Play</span>
            </a>
            <a
              href="#"
              className="bg-darkPink text-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2 hover:bg-pink-600 transition duration-300"
            >
              <FaApple />
              <span>App Store</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsSection;
