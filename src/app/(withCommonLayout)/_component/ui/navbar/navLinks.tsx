"use client";

import React from "react";
import clsx from "clsx";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { NavRoutes } from "./navRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row gap-8 justify-start lg:ml-10">
      {NavRoutes.map((item) => {
        const isActive = pathname === item.href;

        return (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className={clsx(
                linkStyles({ color: "foreground" }),
                isActive ? "text-pink-400 font-medium" : "text-default-800"
              )}
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      })}
    </ul>
  );
}
