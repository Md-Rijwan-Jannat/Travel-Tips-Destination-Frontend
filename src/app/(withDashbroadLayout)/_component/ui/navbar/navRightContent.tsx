"use client";

import { Bell, Plus } from "lucide-react";
import React from "react";
import { Badge } from "@nextui-org/badge";
import NavDropdown from "@/src/app/(withCommonLayout)/_component/ui/navbar/navDropdown";
import Link from "next/link";
import AddFriendModal from "../../modal/addFriendModal";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function NavRightContent() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Badge
        as={Link}
        href="/notifications"
        size="md"
        color="danger"
        content={5}
        shape="circle"
      >
        <Bell />
      </Badge>
      <NavDropdown />
    </div>
  );
}
