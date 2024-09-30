"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./CButton.modules.css";

interface IButtonProps {
  text: string;
  link?: string; // Make link optional
  bgColor: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void; // Optional click handler
}

export default function CButton({
  text,
  link,
  bgColor,
  type = "button", // Default type is "button"
  onClick,
}: IButtonProps) {
  return (
    <div className={"container"}>
      <motion.button
        className={"btn"}
        type={type}
        onClick={onClick} // Ensure onClick is used for buttons
        style={
          {
            "--btn-bg-color": bgColor,
            "--btn-shadow-color": bgColor,
          } as React.CSSProperties
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {link && type !== "submit" ? (
          <Link className="text-default-700 font-semibold link" href={link}>
            {text}
          </Link>
        ) : (
          <p className="link">{text}</p>
        )}
      </motion.button>
    </div>
  );
}
