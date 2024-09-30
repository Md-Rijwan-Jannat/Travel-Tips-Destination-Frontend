import React from "react";
import { FaSpinner } from "react-icons/fa";

const GlassLoader = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <FaSpinner className="animate-spin text-pink-500" size={30} />
    </div>
  );
};

export default GlassLoader;
