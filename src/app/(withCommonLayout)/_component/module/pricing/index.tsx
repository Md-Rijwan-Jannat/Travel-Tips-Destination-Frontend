'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Pricing() {
  return (
    <div className="p-5 min-h-screen mt-10">
      <motion.h1
        className="text-3xl font-bold text-center text-default-700 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Get Verified & Unlock Premium Content
      </motion.h1>

      <motion.p
        className="text-lg text-center text-default-700 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Upgrade your profile by purchasing a verified badge for 1000 BDT. With
        the verified badge, you will gain access to exclusive premium content,
        and it enhances your credibility within the community!
      </motion.p>

      <div className="grid gap-10 sm:grid-cols-2 justify-center">
        <motion.div
          className="bg-default-50 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-600">
            Why Get Verified?
          </h2>
          <p className="mb-3">
            A verified badge gives you premium access and highlights your
            profile across the platform.
          </p>
          <ul className="list-disc ml-5 mb-3">
            <li>Access premium travel content.</li>
            <li>Unlock exclusive guides and tips.</li>
            <li>Stand out with a verified badge on your profile.</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-default-50 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-600">
            How to Get Verified
          </h2>
          <p className="mb-3">
            Purchase a verified badge for just <strong>1000 BDT</strong>. Follow
            these simple steps:
          </p>
          <ul className="list-disc ml-5 mb-3">
            <li>
              Click the <strong>Buy Now</strong> button below.
            </li>
            <li>Complete your payment using our secure checkout system.</li>
            <li>Your profile will be verified instantly after payment.</li>
          </ul>
          <Button
            radius="full"
            as={Link}
            href="#"
            className="bg-default-50 border border-pink-500 text-pink-500 font-semibold px-4 py-3 rounded-full transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
          >
            Buy Now for 1000 BDT
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="bg-default-50 bg-opacity-15 rounded-lg p-5 mt-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-3 text-pink-600">
          What You Get with the Badge
        </h2>
        <div className="mb-3">
          <h3 className="font-semibold">Premium Content Access</h3>
          <p>Exclusive travel guides, tips, and insider stories.</p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold">Increased Profile Visibility</h3>
          <p>
            Stand out with a verified badge and get more visibility within the
            community.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold">Exclusive Offers & Discounts</h3>
          <p>Get access to special deals and discounts from partners.</p>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-default-50 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Do not miss out on premium travel content. Get verified now!
      </motion.p>
    </div>
  );
}
