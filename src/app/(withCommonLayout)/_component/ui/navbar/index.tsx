import React from "react";
import { Logo } from "@/src/components/ui/icons";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/src/components/ui/theme-switch";
import NavLinks from "./navLinks";
import SearchInput from "./searchInput";
import CButton from "@/src/components/ui/CButton/CButton";

export default function NavBar() {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
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
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-4">
          {/* <CButton text="Dashboard" link="/admin" bgColor="#2db2ff" /> */}
          <CButton text="Register" link="/register" bgColor="#ff1f71" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="flex items-center  md:hidden gap-4"
        justify="end"
      >
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavLinks />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
