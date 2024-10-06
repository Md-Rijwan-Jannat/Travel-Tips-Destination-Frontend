"use client";

import React from "react";
import clsx from "clsx";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { NavRoutes } from "./navRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo } = useUser();

  // Handler for protecting routes like news-feed/posts
  const protectHandler = (href: string) => {
    if (!userInfo?.email) {
      router.push("/login");
    } else {
      router.push(href);
    }
  };

  return (
    <ul className="flex flex-col md:flex-row gap-4 justify-start ml-2">
      {NavRoutes.map((item) => (
        <NavbarItem key={item.href}>
          {item.href === "/news-feed/posts" ? (
            // For the protected route, use the protectHandler
            <button
              onClick={(e) => {
                e.preventDefault();
                protectHandler(item.href);
              }}
              className={clsx(
                linkStyles({ color: "foreground" }),
                "cursor-pointer data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
            >
              {item.label}
            </button>
          ) : (
            // For other routes, use a regular Link component
            <Link
              href={item.href}
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
            >
              {item.label}
            </Link>
          )}
        </NavbarItem>
      ))}
    </ul>
  );
}
