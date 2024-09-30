"use client";

import React from "react";
import clsx from "clsx";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { NavRoutes } from "./navRoute";

export default function NavLinks() {
  return (
    <ul className="flex flex-col md:flex-row gap-4 justify-start ml-2">
      {NavRoutes.map((item) => (
        <NavbarItem key={item.href}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
}
