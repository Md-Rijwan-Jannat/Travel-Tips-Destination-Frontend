import React from "react";
import Image from "next/image";

import logo from "@/src/assets/travel-brand-logo.png";
export default function BrandLogo() {
  return (
    <div>
      <Image
        alt="brand-logo"
        className="w-10"
        height={500}
        src={logo}
        width={500}
      />
    </div>
  );
}
