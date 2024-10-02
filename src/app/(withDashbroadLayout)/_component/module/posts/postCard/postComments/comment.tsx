import React from "react";
import { motion } from "framer-motion";
import { FaRegComment } from "react-icons/fa";

export default function Comment() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center text-sm text-default-600 hover:text-blue-500 gap-1 rounded px-2 py-1"
    >
      <FaRegComment size={16} />
      Comment
    </motion.button>
  );
}
