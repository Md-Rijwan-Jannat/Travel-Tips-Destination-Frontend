'use client';

import React, { useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { motion } from 'framer-motion';
import CButton from '@/src/components/ui/CButton/CButton';
import { primaryColor } from '@/src/styles/button';
import GlassLoader from '@/src/components/shared/glassLoader';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);

    toast.success('Message send successful');
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="text-center h-[60vh] mx-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-default-700 flex items-center justify-center my-2 text-xs">
          <Link href={'/'}>Home</Link> &gt; Contact Us
        </p>
        <Image
          className="w-[250px]"
          src={
            'https://uigaint.com/demo/html/staco_i/assets/images/services/skills-img.svg'
          }
          width={500}
          height={500}
          alt="doc image"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg w-full md:w-[500px] border p-5 bg-default-50"
      >
        {/* Name Field */}
        <div className="mb-6">
          <Input
            fullWidth
            variant="underlined"
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <Input
            fullWidth
            variant="underlined"
            label="Your Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <Textarea
            fullWidth
            variant="underlined"
            label="Your Message"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-5">
          <CButton text="Submit" type="submit" bgColor={primaryColor} />
        </div>
      </form>
    </div>
  );
}
