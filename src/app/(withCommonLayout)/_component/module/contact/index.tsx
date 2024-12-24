'use client';

import React, { useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@nextui-org/button';

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

    toast.success('Message sent successfully');
  };

  return (
    <div className="max-w-7xl w-full">
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

      {/* Form Section */}
      <div className="flex items-center justify-between gap-5 flex-col md:flex-row border border-default-100 p-5 bg-default-50 rounded-md w-full">
        <Image
          src={
            'https://tykit.rometheme.pro/sogram/wp-content/uploads/sites/15/2021/07/ps8.png'
          }
          height={500}
          width={500}
          alt="contact"
        />
        <form
          onSubmit={handleSubmit}
          className="rounded-lg w-full md:w-[500px] space-y-7"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-pink-600 tracking-wider text-sm md:text-lg my-3">
              Travel Platform
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold">
              Do not hesitate to ask <br /> a question
            </h1>
          </motion.div>

          {/* Name Field */}
          <Input
            fullWidth
            variant="bordered"
            radius="full"
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email Field */}
          <Input
            fullWidth
            variant="bordered"
            radius="full"
            label="Your Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Message Field */}
          <Textarea
            fullWidth
            variant="bordered"
            radius="full"
            label="Your Message"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          {/* Submit Button */}

          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="primary-button"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="mt-10 p-5 bg-default-50/50 rounded-md shadow-lg backdrop-blur-2xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-primaryColor">Get in Touch</h2>
          <p className="text-default-700 mt-2">
            We’d love to hear from you! Reach us via:
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4 justify-center">
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>Email:</strong> contact@example.com
            </p>
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>WhatsApp:</strong> +123 456 7890
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
