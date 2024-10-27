// components/SocialMediaSolutionSection.tsx

import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SectionTitle from '../../../ui/sectionTitle';

const SocialMediaSolutionSection: React.FC = () => {
  return (
    <>
      <SectionTitle text="Go On" />
      <section
        className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r bg-default-50 rounded-lg p-8 lg:p-12 space-y-8 lg:space-y-0 mt-10
      "
      >
        {/* Left Side - Large Image with Badge */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
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
          <div className="absolute top-6 right-6 bg-white px-6 py-6 rounded-full shadow-lg flex items-center space-x-2">
            <span className="text-xl font-bold text-pink-500">12+</span>
            <span className="text-gray-600 text-xs">YEAR EXPERIENCE</span>
          </div>
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
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
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
          <ul className="space-y-2 text-default-800 text-sm lg:text-base">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Expert travel tips
              and guides.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Inspiration for
              unique destinations.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Community-driven
              recommendations.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Tips for
              budget-friendly travel.
            </li>
          </ul>

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
              className="bg-default-50 border border-pink-500 text-pink-500 font-semibold px-4 py-2 rounded-full"
            >
              More About Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaSolutionSection;
