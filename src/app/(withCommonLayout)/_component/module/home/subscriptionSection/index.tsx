import React, { FC } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';

const SubscriptionSection: FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 my-10 bg-default-50 rounded-lg p-3 md:p-8 lg:16">
      {/* Left Side - Text and Subscription Form */}
      <div className="text-center lg:text-left w-full lg:w-1/2 space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-default-800">
          Discover <span className="text-pink-500">Hidden Gems</span> <br />
          Around the World
        </h2>
        <p className="text-default-800 text-sm lg:text-base">
          Stay updated with the latest travel tips, destination guides, and
          insider recommendations to make your next adventure unforgettable.
          Join our community of travelers today!
        </p>

        {/* Subscription Form */}
        <div className="flex flex-col items-center w-full space-y-4">
          <input
            type="email"
            placeholder="Enter Your Email Address.."
            className="p-3 rounded-full focus:outline-none bg-white text-gray-700 placeholder:text-gray-700 w-full border border-default-300"
          />
          <Button className="bg-default-50 border border-pink-500 text-pink-500 font-semibold px-4 py-3 rounded-full">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Right Side - iPhone Mockup Image */}
      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative w-[200px] md:w-[300px]">
          <Image
            src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/social-media-iphone-v-1.png" // Replace with the actual path to your image
            alt="iPhone Mockup"
            width={300}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
