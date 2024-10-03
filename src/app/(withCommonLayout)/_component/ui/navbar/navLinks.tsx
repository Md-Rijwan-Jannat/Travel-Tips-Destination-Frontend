"use client";

import React from "react";
import clsx from "clsx";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { useRouter } from "next/navigation"; // Use Next.js router
import { NavRoutes } from "./navRoute";
import { useUser } from "@/src/hooks/useUser";

export default function NavLinks() {
  const { userInfo: currentUser } = useUser();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (!currentUser?.email && href === "/news-feed/posts") {
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
    } else {
      router.push(href);
    }
  };

  return (
    <ul className="flex flex-col md:flex-row gap-4 justify-start ml-2">
      {NavRoutes.map((item) => (
        <NavbarItem key={item.href}>
          <button
            onClick={() => handleNavigation(item.href)}
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
          >
            {item.label}
          </button>
        </NavbarItem>
      ))}
    </ul>
  );
}
