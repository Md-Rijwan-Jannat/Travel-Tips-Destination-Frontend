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

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { clearCredentials, getUser } from "@/src/redux/features/auth/authSlice";
import CButton from "@/src/components/ui/CButton/CButton";
import { useUser } from "@/src/hooks/useUser";
import Cookies from "js-cookie";
import { toast } from "sonner";

type TNavDropdownProps = object;

const NavDropdown: FC<TNavDropdownProps> = () => {
  const dispatch = useAppDispatch();
  const userExists = useAppSelector(getUser);
  const router = useRouter();
  const pathname = usePathname();

  const { userInfo } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(`${pathname}`);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    Cookies.remove("accessToken");
    router.push("/");
    toast.success("Logout successful");
  };

  return (
    <>
      {userExists?.email ? (
        <Dropdown className="">
          <DropdownTrigger>
            <Avatar
              className={`cursor-pointer text-[24px] font-bold`}
              name={userInfo?.name.charAt(0).toUpperCase()}
              size="md"
              src={userInfo?.image || undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem
              className={`${userInfo?.role === "USER" ? "block" : "hidden"}`}
              onClick={() => handleNavigation("/profile")}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              className={`${userInfo?.role === "USER" ? "block" : "hidden"}`}
              onClick={() => handleNavigation("/profile/dashboard")}
            >
              Dashboard
            </DropdownItem>

            <DropdownItem
              className={`${userInfo?.role === "ADMIN" ? "block" : "hidden"}`}
              onClick={() => handleNavigation("/admin-dashboard")}
            >
              Admin Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => handleNavigation("/admin-dashboard/setting")}
            >
              Setting
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CButton size="sm" bgColor="#ff1f71" link="/register" text="Register" />
      )}
    </>
  );
};

export default NavDropdown;
