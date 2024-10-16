"use client";

import React from "react";
import Chat from "../_component/module/messages";
import { useUser } from "@/src/hooks/useUser";
import MessageCardList from "../_component/module/messages";

export default function MessagePage() {
  const { userInfo } = useUser();

  return (
    <div className="scrollbar-hide">
      <MessageCardList />
    </div>
  );
}
