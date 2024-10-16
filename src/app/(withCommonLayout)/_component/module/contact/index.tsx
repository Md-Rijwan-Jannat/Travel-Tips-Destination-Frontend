"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { motion } from "framer-motion";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";
import GlassLoader from "@/src/components/shared/glassLoader";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would handle the form submission, such as sending data to an API
    // Example:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, message }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // Simulate successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);

    toast.success("Message send successful");
  };

  return (
    <motion.div
      className="h-screen m-auto flex  items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {isSubmitting && <GlassLoader />}
      <div className="bg-default-50 bg-opacity-15 py-8 px-4 h-[400px] flex flex-col md:flex-row items-center justify-center rounded-md gap-10">
        <div className="rounded-lg w-full md:w-[500px]">
          <h2 className="text-3xl font-semibold text-pink-400 mb-8 text-center">
            Contact Us
          </h2>
          <p className="text-lg text-center text-default-700 mb-8">
            Have any questions or feedback? Fill out the form below, and we will
            get back to you as soon as possible. We are always excited to hear
            from fellow travelers!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg w-full md:w-[500px] "
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
    </motion.div>
  );
}
