"use client";

import { SearchIcon } from "@/src/components/ui/icons";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React from "react";

export default function SearchInput() {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      size="md"
      radius="full"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
}
