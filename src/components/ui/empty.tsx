"use client";

import { useUser } from "@/src/hooks/useUser";
import React from "react";

interface TEmptyProps {
  message?: string;
}

export default function Empty({ message }: TEmptyProps) {
  const { userInfo } = useUser();

  // Determine the width based on user role
  const containerWidth =
    userInfo?.role === "ADMIN"
      ? "w-full h-[500px]"
      : "md:[500px] xl:w-[600px] h-[70vh]";

  return (
    <div
      className={`${containerWidth}  flex flex-col gap-3 items-center justify-center bg-default-50 rounded-md`}
    >
      <h2 className="border border-default-200 rounded-full px-4 py-2">
        Empty
      </h2>
      <p className="text-default-500 text-xs">{message}</p>
    </div>
  );
}
