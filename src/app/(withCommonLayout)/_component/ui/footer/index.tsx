'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import BrandLogo from '@/src/components/shared/logo';
import { Divider } from '@nextui-org/divider';
import SocialLinks from '../socialLinks';
import Link from 'next/link'; // Import Next.js Link component
import Image from 'next/image';

const Footer: React.FC = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="text-default-900 flex flex-col items-center py-10">
      <Divider className="my-2" />

      <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between w-full gap-8 mb-8 max-w-7xl mx-auto px-2 md:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center md:items-start text-center justify-center md:justify-center md:text-left w-full md:w-[200px]"
        >
          <div className="flex justify-center md:justify-start items-center gap-1">
            <BrandLogo />
            <p className="font-bold text-inherit">TT&DG</p>
          </div>
          <p className="text-default-900 text-xs">
            Exploring the World, one adventure at a time. Connecting travelers
            everywhere and your journey starts here.
          </p>
        </motion.div>

        {/* Satisfied Travelers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center md:text-left mt-2"
        >
          <h3 className="text-lg font-semibold mb-2">Satisfied Travelers</h3>
          <motion.div
            className="text-4xl font-bold text-pink-500 mt-1 flex flex-col gap-1 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              className="w-[200px] object-cover rounded"
              src={
                'https://res.cloudinary.com/dihqveqyc/image/upload/v1730004592/hclxgpwllvotvtew74ag.avif'
              }
              width={500}
              height={500}
              alt="plane"
            />
            <CountUp
              className="-mt-12"
              end={5879}
              duration={2.5}
              separator=","
            />
          </motion.div>
        </motion.div>

        {/* Our Offices - Static Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center md:items-start md:text-left mt-2"
        >
          <h3 className="text-lg font-semibold mb-2">Our Office Location</h3>
          <p className="text-default-900 text-xs">Bogura, Bangladesh</p>
          <p className="text-default-900 text-xs">travel@travel.com</p>
          <p className="text-default-900 text-xs">+880 1797550947</p>
          <SocialLinks />
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center md:flex-row md:justify-center mt-4">
        <Link
          href="/news-feed/posts"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          News Feed
        </Link>
        <Link
          href="/docs"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          Docs
        </Link>
        <Link
          href="/pricing"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          Pricing
        </Link>
        <Link
          href="/blog"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="mx-2 hover:text-default-900 text-default-800 text-xs"
        >
          Contact Us
        </Link>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-2 pt-4 text-sm text-default-900 flex items-center flex-col md:flex-row justify-between w-full max-w-7xl mx-auto px-2 md:px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span>© Copyright Travel Platform {date}</span>
        <div className="space-x-4">
          <Link
            href="/sitemap"
            className="hover:text-default-900 text-default-800 text-xs"
          >
            Sitemap
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-default-900 text-default-800 text-xs"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-default-900 text-default-800 text-xs"
          >
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
