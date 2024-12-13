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
import { useUser } from '@/src/hooks/useUser';
import { toast } from 'sonner';
import { Logout } from '@/src/service/logout';
import { useDisclosure } from '@nextui-org/modal';
import { ThemeSwitch } from '@/src/components/ui/theme-switch';
import CreateGroupModal from '@/src/app/(withDashbroadLayout)/_component/modal/createGroupModal';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import {
  UserCircle,
  Settings,
  Users,
  MessageCircle,
  LogOut,
  UserPlus,
} from 'lucide-react';

const NavDropdown: FC = () => {
  const dispatch = useAppDispatch();
  const userExists = useAppSelector(getUser);
  const router = useRouter();

  const { userInfo } = useUser();
  const handleLogout = async () => {
    dispatch(clearCredentials());
    await Logout();
    router.push('/');
    toast.success('Logout successful');
  };

  const {
    isOpen: isGroupOpen,
    onOpen: onGroupOpen,
    onOpenChange: onGroupChange,
  } = useDisclosure();

  const dropdownItemClass =
    'flex items-center gap-2 transition-all duration-300 hover:bg-default-50 rounded';
  const dropdownItemClass2 =
    'flex items-center gap-2 transition-all duration-300 text-red-500 hover:text-red-600 bgt-transparent rounded';

  return (
    <>
      {!userExists?.email && <ThemeSwitch />}
      {userExists?.email ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              className="cursor-pointer"
              name={userInfo?.name.charAt(0).toUpperCase()}
              size="md"
              src={userInfo?.image || undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem
              as={Link}
              href="/profile"
              className={`${userInfo?.role === 'USER' ? 'block' : 'hidden'} ${dropdownItemClass}`}
              startContent={<UserCircle className="w-4 h-4" />}
            >
              Profile
            </DropdownItem>

            <DropdownItem
              as={Link}
              href="/admin-dashboard"
              className={`${userInfo?.role === 'ADMIN' ? 'block' : 'hidden'} ${dropdownItemClass}`}
              startContent={<Settings className="w-4 h-4" />}
            >
              Admin Profile
            </DropdownItem>
            <DropdownItem
              onClick={onGroupOpen}
              className={dropdownItemClass}
              startContent={<Users className="w-4 h-4" />}
            >
              Create Group
            </DropdownItem>
            <DropdownItem
              as={Link}
              href="/messages"
              className={dropdownItemClass}
              startContent={<MessageCircle className="w-4 h-4" />}
            >
              Chat
            </DropdownItem>
            <DropdownItem
              onClick={handleLogout}
              className={dropdownItemClass2}
              startContent={<LogOut className="w-4 h-4" />}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="secondary-button flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-white"
              as={Link}
              href="/register"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Button>
          </motion.div>
        </div>
      )}
      <CreateGroupModal isOpen={isGroupOpen} onOpenChange={onGroupChange} />
    </>
  );
};

export default NavDropdown;
