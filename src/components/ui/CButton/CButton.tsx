"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./CButton.modules.css";

interface IButtonProps {
  text: string;
  link?: string;
  bgColor: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function CButton({
  text,
  link,
  bgColor,
  type = "button",
  size = "md",
  onClick,
}: IButtonProps) {
  return (
    <div className={"container"}>
      <motion.button
        animate={{ opacity: 1 }}
        className={`btn ${size}`} // Apply the size class
        initial={{ opacity: 0 }}
        style={
          {
            "--btn-bg-color": bgColor,
            "--btn-shadow-color": bgColor,
          } as React.CSSProperties
        }
        transition={{ duration: 0.3 }}
        type={type}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick} // Ensure onClick is used for buttons
      >
        {link && type !== "submit" ? (
          <Link className="text-default-900 font-semibold link" href={link}>
            {text}
          </Link>
        ) : (
          <p className="link text-default-900">{text}</p>
        )}
      </motion.button>
    </div>
  );
}
