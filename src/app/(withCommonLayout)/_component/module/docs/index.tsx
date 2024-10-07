"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Documentations() {
  return (
    <div className="p-2 min-h-screen mt-10">
      <motion.h1
        className="text-3xl font-bold text-center text-default-700 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Travel Tips & Destination Guides
      </motion.h1>

      <motion.p
        className="text-lg text-center text-default-700 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to Your Travel Community! This platform is designed to help you
        share your travel stories, tips, and interact with fellow travelers.
        Here is how to get started!
      </motion.p>

      <div className="grid gap-10 sm:grid-cols-2">
        <motion.div
          className="bg-default-50 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-600">
            Using Social Media Features
          </h2>
          <p className="mb-2">
            Engage with the community by following other travelers, commenting
            on posts, and sharing your own experiences.
          </p>
          <ul className="list-disc ml-5 mb-3">
            <li>
              <strong>Follow:</strong> Users to stay updated on their posts.
            </li>
            <li>
              <strong>Comment:</strong> On posts to share your thoughts.
            </li>
            <li>
              <strong>Upvote:</strong> Content you find valuable.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-default-50 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-600">
            Creating a Post
          </h2>
          <p className="mb-2">
            Use the rich text editor to create detailed travel guides:
          </p>
          <ul className="list-disc ml-5 mb-3">
            <li>
              Click the <strong>Create Post</strong> button.
            </li>
            <li>Add a title and content using the editor.</li>
            <li>Attach images for better storytelling.</li>
            <li>Categorize your post for easy discovery.</li>
          </ul>
          <Button
            radius="full"
            as={Link}
            href="/news-feed/posts"
            className="border-primaryColor text-default-50 bg-pink-600 rounded-md"
          >
            Create a Post
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
          Frequently Asked Questions
        </h2>
        <div className="mb-3">
          <h3 className="font-semibold">User Authentication</h3>
          <p>
            Register using your email and password. Secure login is ensured with
            JWT.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold">Profile Management</h3>
          <p>
            Update your profile, follow others, and verify your profile for
            premium content access.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold">Upvote and Downvote System</h3>
          <p>
            Help others discover great content by upvoting or downvoting posts.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold">Payment Integration</h3>
          <p>
            Access premium content through secure payments like Aamarpay or
            Stripe.
          </p>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-default-50 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        For further assistance, contact us. Happy travels!
      </motion.p>
    </div>
  );
}
