import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import NavLinks from "./navLinks";
import NavDropdown from "./navDropdown";
import BrandLogo from "@/src/components/shared/logo";
import ThemeDropdown from "@/src/components/modal/themeDropdown";

export default function NavBar() {
  return (
    <NextUINavbar
      className="shadow-sm bg-default-50/20 backdrop-blur-2xl fixed"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <BrandLogo />
            <p className="font-bold text-inherit">TT&DG</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full items-center"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-4">
          <ThemeDropdown />
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-4">
          <NavDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="flex items-center  md:hidden gap-4"
        justify="end"
      >
        <ThemeDropdown />
        <NavDropdown />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavLinks />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
