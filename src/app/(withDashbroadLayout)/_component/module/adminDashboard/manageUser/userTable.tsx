// components/UserTable.tsx
"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { TUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";

type UserTableProps = {
  users: TUser[];
  handleStatusUpdate: (userId: string, newStatus: string) => void;
  handleRoleUpdate: (userId: string, newRole: string) => void;
  isLoading: boolean;
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  handleStatusUpdate,
  handleRoleUpdate,
  isLoading,
}) => {
  return (
    <Table className="overflow-x-auto" aria-label="User Table">
      <TableHeader>
        <TableColumn>Profile</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <div className="flex gap-1">
                <Avatar
                  as={Link}
                  href={`/profile/${user?._id}`}
                  name={user?.name?.charAt(0)?.toUpperCase()}
                  src={user?.image || undefined}
                  size="sm"
                />{" "}
              </div>
            </TableCell>

            <TableCell>
              <Link
                href={`/profile/${user?._id}`}
                className="whitespace-nowrap hover:underline"
              >
                {user.name}
              </Link>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role === "ADMIN" ? (
                <>
                  <Chip className="w-[50px]" size="sm" variant="faded">
                    Admin
                  </Chip>
                </>
              ) : (
                <>
                  <Chip className="w-[50px]" size="sm" variant="bordered">
                    User
                  </Chip>
                </>
              )}
            </TableCell>
            <TableCell>
              {user.status === "IN_PROGRESS" ? (
                <>
                  <Chip size="sm" color="success" variant="dot">
                    Active
                  </Chip>
                </>
              ) : (
                <>
                  <Chip size="sm" color="danger" variant="dot">
                    Paused
                  </Chip>
                </>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Dropdown size="sm">
                  <DropdownTrigger>
                    <Button size="sm" variant="bordered">
                      Role
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="admin"
                      onClick={() => handleRoleUpdate(user._id, "ADMIN")}
                    >
                      Make Admin
                    </DropdownItem>
                    <DropdownItem
                      key="user"
                      onClick={() => handleRoleUpdate(user._id, "USER")}
                    >
                      Make User
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown size="sm">
                  <DropdownTrigger>
                    <Button size="sm" variant="bordered">
                      Paused User
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="active"
                      onClick={() =>
                        handleStatusUpdate(user._id, "IN_PROGRESS")
                      }
                    >
                      Set Active
                    </DropdownItem>
                    <DropdownItem
                      key="paused"
                      onClick={() => handleStatusUpdate(user._id, "BLOCKED")}
                    >
                      Set Paused
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
