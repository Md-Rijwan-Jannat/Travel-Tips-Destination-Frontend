import React from "react";
import { motion } from "framer-motion";
import { FaRegComment } from "react-icons/fa";
import Link from "next/link";

export default function Comment({ _id }: { _id: string }) {
  return (
    <Link href={`/news-feed/posts/${_id}`}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center text-xs md:text-sm text-default-600 hover:text-blue-500 gap-1 rounded px-2 py-1"
      >
        <FaRegComment size={16} />
        Comment
      </motion.div>
    </Link>
  );
}
