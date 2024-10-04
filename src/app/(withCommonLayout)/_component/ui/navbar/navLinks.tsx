"use client";

import React from "react";
import clsx from "clsx";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { NavRoutes } from "./navRoute";
import Link from "next/link";

export default function NavLinks() {
  return (
    <ul className="flex flex-col md:flex-row gap-4 justify-start ml-2">
      {NavRoutes.map((item) => (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </ul>
  );
}
