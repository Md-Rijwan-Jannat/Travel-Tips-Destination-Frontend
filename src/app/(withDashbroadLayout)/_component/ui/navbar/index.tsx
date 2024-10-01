import NextLink from "next/link";
import React from "react";

import NavDropdown from "@/src/app/(withCommonLayout)/_component/ui/navbar/navDropdown";
import SearchInput from "@/src/app/(withCommonLayout)/_component/ui/navbar/searchInput";
import BrandLogo from "@/src/components/shared/logo";

export default function FeedNavbar() {
  return (
    <header className="fixed top-0 z-20 w-full bg-default-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <div className="flex items-center gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <BrandLogo />
            <p className="font-bold text-inherit">TT&DG</p>
          </NextLink>
          <div className="w-[300px]">
            <SearchInput />
          </div>
        </div>
        <NavDropdown />
      </div>
    </header>
  );
}
