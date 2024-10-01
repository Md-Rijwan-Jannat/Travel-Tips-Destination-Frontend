import React from "react";

import Footer from "@/src/app/(withCommonLayout)/_component/ui/footer";
import Navbar from "@/src/app/(withCommonLayout)/_component/ui/navbar";

export default function WithCommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
