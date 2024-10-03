import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-7xl px-2 md:px-6 flex-grow">
      {children}
    </main>
  );
}
