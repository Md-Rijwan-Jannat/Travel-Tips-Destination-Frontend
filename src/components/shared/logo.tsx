import React from "react";
import logo from "@/src/assets/travel-brand-logo.png";
import Image from "next/image";
export default function BrandLogo() {
  return (
    <div>
      <Image
        className="w-10"
        src={logo}
        width={500}
        height={500}
        alt="brand-logo"
      />
    </div>
  );
}
