"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the previous page when the user clicks the back button
    const handleGoBack = () => {
      window.history.back();
    };

    document
      .getElementById("backButton")
      ?.addEventListener("click", handleGoBack);

    return () => {
      document
        .getElementById("backButton")
        ?.removeEventListener("click", handleGoBack);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-blue-500 text-white">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Page Not Found
      </motion.h1>
      <motion.p
        className="text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Oops! The page you are looking for does nt exist.
      </motion.p>
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <button
          id="backButton"
          className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-lg shadow-lg hover:bg-pink-100 transition duration-300"
        >
          Go Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
}
