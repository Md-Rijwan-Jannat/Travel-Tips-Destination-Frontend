import React from "react";
import { Link } from "@nextui-org/link";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="w-full bg-default-50 bg-opacity-5  py-6 px-4 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          isExternal
          href="/register"
          title="Travel Tips & Destination Home page"
          className="flex items-center gap-2 text-default-400 hover:text-primary transition-colors"
        >
          <span>Powered by</span>
          <p className="font-bold text-primary text-lg">TT&DG</p>
        </Link>
      </div>

      <div className="text-sm text-default-400 text-center">
        <p>&copy; {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
}
