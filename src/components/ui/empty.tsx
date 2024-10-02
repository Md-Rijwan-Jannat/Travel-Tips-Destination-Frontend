import React from "react";

interface TEmptyProps {
  message?: string;
}

export default function Empty({ message }: TEmptyProps) {
  return (
    <div className="w-full h-[500px] flex flex-col gap-3 items-center justify-center bg-default-50">
      <h2 className="border border-default-200 rounded-full px-4 py-2">
        Empty
      </h2>
      <p className="text-default-500 text-xs">{message}</p>
    </div>
  );
}
