"use client";

import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React from "react";

import { SearchIcon } from "@/src/components/ui/icons";
import { useGetAllPostsQuery } from "@/src/redux/features/post/postApi";

export default function SearchInput() {
  const { data: allPostsData } = useGetAllPostsQuery(undefined);

  console.log(allPostsData);

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
      radius="full"
      size="md"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
}
