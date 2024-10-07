"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/divider";

export default function ProfileSkeleton() {
  return (
    <motion.div
      className="w-full md:w-[500px] xl:w-[600px] mx-auto"
      initial={{ opacity: 0, y: 20 }} // Animating container on load
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Skeleton Profile Section */}
      <div className="flex flex-col items-center relative">
        {/* Skeleton Avatar */}
        <Skeleton className="rounded-full w-16 h-16 mb-4" />

        {/* Skeleton Name */}
        <Skeleton className="w-32 h-4 rounded-full mb-2" />

        {/* Skeleton Verify Badge */}
        <Skeleton className="w-20 h-4 rounded-full mb-4" />

        {/* Skeleton Follower and Following Count */}
        <motion.div
          className="flex justify-around w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center">
            <Skeleton className="w-12 h-4 rounded-full mb-1" />
            <Skeleton className="w-16 h-4 rounded-full" />
          </div>
          <div className="text-center">
            <Skeleton className="w-12 h-4 rounded-full mb-1" />
            <Skeleton className="w-16 h-4 rounded-full" />
          </div>
        </motion.div>

        {/* Skeleton Address and Country */}
        <div className="flex items-center gap-3 mt-3 text-start">
          <Skeleton className="w-20 h-4 rounded-full" />
          <Skeleton className="w-20 h-4 rounded-full" />
        </div>

        <Divider className="my-4 text-default-100" />

        {/* Skeleton Post Modal */}
        <Skeleton className="w-full h-10 rounded-lg mb-5" />

        {/* Skeleton Tab Navigation */}
        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </motion.div>
  );
}
