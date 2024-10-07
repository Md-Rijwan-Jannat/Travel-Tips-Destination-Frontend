"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="p-5 min-h-screen border-default-50 mt-10">
      <motion.h1
        className="text-3xl font-bold text-center text-default-700 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="text-lg text-center text-default-700 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to our travel community! We are passionate travelers who believe
        in the power of exploration and sharing experiences. Our platform aims
        to connect adventurers and provide valuable resources to help you make
        the most of your journeys.
      </motion.p>

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
