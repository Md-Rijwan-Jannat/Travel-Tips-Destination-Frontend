"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CButton from "./CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";

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
    <div className="flex flex-col items-center justify-center h-screen text-default-600">
      {/* Blurred Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 opacity-70 blur-[100px] absolute top-10 left-20" />
        <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-70 blur-[100px] absolute bottom-10 right-20 " />
      </div>

      <motion.h1
        className="text-2xl md:text-5xl text-pink-500 mb-4"
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
        <CButton text="Go Back" bgColor={primaryColor} />
        <CButton
          onClick={() => router.push("/")}
          text="Home"
          bgColor={secondaryColor}
        />
      </motion.div>
    </div>
  );
}
