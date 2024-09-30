import Container from "@/src/components/shared/container";
import React from "react";

export default function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-default-50">
      {" "}
      <Container>{children}</Container>
    </div>
  );
}
