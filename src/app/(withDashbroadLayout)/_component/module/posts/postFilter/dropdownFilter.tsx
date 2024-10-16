// src/components/ui/DropdownFilter.tsx

"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

interface DropdownFilterProps {
  filterOption: string;
  setFilterOption: (option: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  filterOption,
  setFilterOption,
}) => {
  return (
    <div className="mb-6 -mx-3 flex items-center justify-end w-full">
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button size="sm" variant="faded" className="capitalize">
            {filterOption === "popular"
              ? "Popular Posts"
              : filterOption === "poor"
                ? "Poor Posts"
                : "All Posts"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Post filtering options"
          selectionMode="single"
          selectedKeys={new Set([filterOption])}
          onSelectionChange={(key) =>
            setFilterOption(Array.from(key)[0] as string)
          }
        >
          <DropdownItem key="all">All Posts</DropdownItem>
          <DropdownItem key="popular">Popular Posts</DropdownItem>
          <DropdownItem key="poor">Poor Posts</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownFilter;
