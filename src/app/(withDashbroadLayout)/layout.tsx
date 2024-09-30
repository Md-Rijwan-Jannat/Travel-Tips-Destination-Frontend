import Container from "@/src/components/shared/container";
import React from "react";

export default function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      {" "}
      <Container>{children}</Container>
    </div>
  );
}
