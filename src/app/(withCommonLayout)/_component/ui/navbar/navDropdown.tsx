"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { clearCredentials, getUser } from "@/src/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/src/redux/features/auth/authApi";
import { TUser } from "@/src/types";
import CButton from "@/src/components/ui/CButton/CButton";
import { useUser } from "@/src/hooks/useUser";

type TNavDropdownProps = object;

const NavDropdown: FC<TNavDropdownProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { userInfo, isFetching } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(`/user/${pathname}`);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/login");
  };

  return (
    <>
      {!isFetching && userInfo?.email ? (
        <Dropdown className="">
          <DropdownTrigger>
            <Avatar
              className={`cursor-pointer text-[24px] font-bold`}
              size="md"
              name={userInfo?.name.charAt(0).toUpperCase()}
              src={""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem onClick={() => handleNavigation("")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("claim-requests")}>
              Claim Requests
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("create-post")}>
              Create Post
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation("setting")}>
              Setting
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CButton text="Register" link="/register" bgColor="#ff1f71" />
      )}
    </>
  );
};

export default NavDropdown;
