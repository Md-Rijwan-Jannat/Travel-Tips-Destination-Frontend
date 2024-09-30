import Footer from "@/src/app/(withCommonLayout)/_component/ui/footer";
import Navbar from "@/src/app/(withCommonLayout)/_component/ui/navbar";
import Container from "@/src/components/shared/container";
import React from "react";

export default function WithCommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
