import React from "react";
import logo from "@/src/assets/travel-brand-logo.png";
import Image from "next/image";
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto">
      <Image
        alt="brand-logo"
        className="w-10 h-10 animate-pulse duration-500 z-[99999]"
        height={500}
        src={logo}
        width={500}
      />
    </div>
  );
}
