import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { IoSend } from "react-icons/io5";
import { useUser } from "@/src/hooks/useUser";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

interface CommentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function CommentInput({
  value,
  onChange,
  onSubmit,
}: CommentInputProps) {
  const { userInfo: currentUser } = useUser();

  return (
    <div className="flex items-center justify-between rounded-lg shadow-sm gap-4 w-full mt-3">
      <div className="flex items-center gap-2 w-full">
        {/* Avatar */}
        <div className="w-[50px]">
          <Avatar
            name={currentUser?.name.charAt(0).toUpperCase()}
            src={currentUser?.image || undefined}
            size="sm"
            className="mr-2"
            alt="Profile Picture"
          />
        </div>
        {/* Input Box */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Write a comment..."
          className="flex-grow bg-default-50 px-2 py-1 text-xs rounded-full border border-default-200 focus:outline-none focus:ring-1 focus:ring-default-300 w-full"
        />
      </div>
      {/* Send Icon with Framer Motion Animation */}
      <motion.div
        whileHover={{ scale: 1.1 }} // Scale animation on hover
        whileTap={{ scale: 0.9 }} // Scale down slightly on tap/click
      >
        <Button
          className="bg-default-50"
          isIconOnly
          size="sm"
          radius="full"
          onPress={onSubmit}
          startContent={<IoSend className="text-primaryColor" size={18} />}
        />
      </motion.div>
    </div>
  );
}
