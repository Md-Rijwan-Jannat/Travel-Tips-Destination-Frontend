'use client';

import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hook';
import { clearCredentials, getUser } from '@/src/redux/features/auth/authSlice';
import CButton from '@/src/components/ui/CButton/CButton';
import { useUser } from '@/src/hooks/useUser';
import { toast } from 'sonner';
import { Logout } from '@/src/service/logout';
import { useDisclosure } from '@nextui-org/modal';
import ThemeModal from '@/src/components/modal/themeModal';
import { ThemeSwitch } from '@/src/components/ui/theme-switch';
import CreateGroupModal from '@/src/app/(withDashbroadLayout)/_component/modal/createGroupModal';
import Link from 'next/link';

const NavDropdown: FC = () => {
  const dispatch = useAppDispatch();
  const userExists = useAppSelector(getUser);
  const router = useRouter();

  const { userInfo } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(`${pathname}`);
  };
  const handleLogout = async () => {
    dispatch(clearCredentials());
    await Logout();
    router.push('/');
    toast.success('Logout successful');
  };

  const {
    isOpen: isThemeOpen,
    onOpen: onThemeOpen,
    onOpenChange: onThemeChange,
  } = useDisclosure();
  const {
    isOpen: isGroupOpen,
    onOpen: onGroupOpen,
    onOpenChange: onGroupChange,
  } = useDisclosure();

  return (
    <>
      {!userExists?.email && <ThemeSwitch />}
      {userExists?.email ? (
        <Dropdown>
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
              as={Link}
              href="/profile"
              className={`${userInfo?.role === 'USER' ? 'block' : 'hidden'}`}
            >
              Profile
            </DropdownItem>

            <DropdownItem
              as={Link}
              href="/admin-dashboard"
              className={`${userInfo?.role === 'ADMIN' ? 'block' : 'hidden'}`}
            >
              Admin Profile
            </DropdownItem>
            <DropdownItem onClick={onThemeOpen}>Theme</DropdownItem>
            <DropdownItem onClick={onGroupOpen}>Crate Group</DropdownItem>
            <DropdownItem as={Link} href="/messages">
              Chat
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="flex justify-end">
          <CButton
            size="sm"
            bgColor="#ff1f71"
            link="/register"
            text="Register"
          />
        </div>
      )}
      <ThemeModal isOpen={isThemeOpen} onOpenChange={onThemeChange} />
      <CreateGroupModal isOpen={isGroupOpen} onOpenChange={onGroupChange} />
    </>
  );
};

export default NavDropdown;
