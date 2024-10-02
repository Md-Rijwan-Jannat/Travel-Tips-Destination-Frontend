import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="w-full h-[100px] flex items-start justify-center">
      <FaSpinner
        className="animate-spin text-pink-500 ease-in-out duration-2000"
        size={30}
      />
    </div>
  );
}
