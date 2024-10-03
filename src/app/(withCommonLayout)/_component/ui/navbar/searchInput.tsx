"use client";

import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@/src/components/ui/icons";
import { useGetAllPostsQuery } from "@/src/redux/features/post/postApi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch posts with the searchTerm
  const { data: allPostsData, refetch } = useGetAllPostsQuery({ searchTerm });

  const posts = allPostsData?.data;

  useEffect(() => {
    const debounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm, refetch]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Ctrl + K key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <Input
        aria-label="Search"
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        onFocus={() => setIsDropdownOpen(true)}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden md:flex" keys={["command"]}>
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

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && searchTerm && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full mt-2 bg-default-50 border border-default-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto scrollbar-hide"
          >
            {posts?.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 p-2">
                {posts.map((post: any) => (
                  <Link
                    key={post._id}
                    onClick={() => setIsDropdownOpen(false)}
                    className="py-2 px-4 text-sm cursor-pointer hover:bg-default-100 rounded-md border border-default-100"
                    href={`/news-feed/posts/${post?._id}`}
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-sm text-default-500">No posts found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
