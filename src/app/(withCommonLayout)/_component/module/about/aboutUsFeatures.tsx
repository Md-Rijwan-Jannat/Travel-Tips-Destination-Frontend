import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TravelFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tips');

  const tabs = [
    { id: 'tips', label: 'Travel Tips' },
    { id: 'destinations', label: 'Top Destinations' },
    { id: 'guides', label: 'Travel Guides' },
  ];

  const tabContent = {
    tips: 'Get the best travel tips from seasoned travelers to make your journey smoother and more enjoyable.',
    destinations:
      'Discover the most popular travel destinations, from breathtaking beaches to vibrant cities around the world.',
    guides:
      'Explore comprehensive travel guides to help you navigate new places with ease.',
  };

  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 px-2">
      {/* Left Side: Text Content */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-pink-600 tracking-wider text-sm">
          Travel Platform
        </h2>
        <h1 className="text-xl md:text-2xl font-bold">
          Explore the{' '}
          <span className="text-pink-500 bg-pink-100 px-2 rounded">world</span>{' '}
          with the best travel insights
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 items-center justify-center mt-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-3 rounded-full text-xs md:text-sm ${
                activeTab === tab.id
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-default-100 text-default-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <h3 className="font-semibold text-lg mt-6">
          {tabs.find((t) => t.id === activeTab)?.label}
        </h3>
        <p className="text-default-600 text-xs">
          {tabContent[activeTab as keyof typeof tabContent]}
        </p>

        {/* Feature Highlights */}
        <div className="flex space-x-4 mt-6">
          <motion.div
            className="px-3 py-2 text-xs md:text-sm rounded-lg bg-default-50 text-pink-600 border border-default-100"
            whileHover={{ scale: 1.05 }}
          >
            Sustainable Travel Tips
          </motion.div>
          <motion.div
            className="px-3 py-2 text-xs md:text-sm rounded-lg bg-default-50 text-pink-600 border border-default-100"
            whileHover={{ scale: 1.05 }}
          >
            Community Recommendations
          </motion.div>
        </div>
      </div>

      {/* Right Side: Image with Stats */}
      <div className="lg:w-1/2 relative bg-default-50 rounded-lg">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            width={500}
            height={500}
            src="https://media.istockphoto.com/id/1526986072/photo/airplane-flying-over-tropical-sea-at-sunset.jpg?s=612x612&w=0&k=20&c=Ccvg3BqlqsWTT0Mt0CvHlbwCuRjPAIWaCLMKSl3PCks=" // Replace with an appropriate travel-related image URL
            alt="Explore Destinations"
            className="object-cover full"
          />
          {/* Stat 1 */}
          <motion.div
            className="absolute top-4 left-4 bg-white p-3 rounded-lg border border-default-100 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-2xl font-bold">75+</p>
            <p className="text-default-500 text-sm">Countries Covered</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="absolute bottom-4 right-4 bg-white p-3 rounded-lg border border-default-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-2xl font-bold">1M+</p>
            <p className="text-default-500 text-sm">Happy Travelers</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TravelFeatures;
