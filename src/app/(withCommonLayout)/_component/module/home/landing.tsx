'use client';

import { FC } from 'react';
import { Code } from '@nextui-org/code';
import { Snippet } from '@nextui-org/snippet';
import { GoHeart } from 'react-icons/go';
import SocialLinks from '../../ui/socialLinks';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import Image from 'next/image';
import { useGetAllUsersQuery } from '@/src/redux/features/adminManagement/manageUserApi';
import { TUser } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';

type TLandingBannerProps = object;

const LandingBanner: FC<TLandingBannerProps> = () => {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const users = usersData?.data as TUser[];
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 overflow-hidden h-[600px] md:h-[65vh]">
      {/* Main Content */}
      <div className="flex text-pink-500">
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
      </div>
      <div className="inline-block max-w-2xl text-center justify-center z-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-default-900">
          Share Your Travel Tips & Destinations Guides
        </h1>
        <div className="text-lg md:text-xl mt-4 text-default-800">
          Discover breathtaking destinations, share travel stories, and create
          unforgettable memories with fellow explorers.
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 z-10 mt-5 animate-fade-in-up">
        <Button className="primary-button" as={Link} href="/news-feed/posts">
          View Travel Tips
        </Button>
        <Button className="secondary-button" as={Link} href="/docs">
          Learn More
        </Button>
      </div>
      <Image
        src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-social-media-5650320-4705285.png"
        width={500}
        height={500}
        alt="Landing Image"
        className="absolute top-1/3 size-56 left-0 object-cover hidden md:block"
      />
      <Image
        src="https://cdni.iconscout.com/illustration/premium/thumb/young-woman-liking-social-media-post-illustration-download-in-svg-png-gif-file-formats--like-logo-abdicated-digital-world-pack-science-technology-illustrations-6925595.png"
        width={500}
        height={500}
        alt="Landing Image"
        className="absolute top-1/3 size-[240px] right-0 object-cover hidden md:block"
      />

      {/* Social Media Icons */}
      <SocialLinks />

      {/* Snippet */}
      <div className="mt-8 z-10 animate-fade-in-up">
        <div className="flex items-center gap-2 w-full border p-2 rounded-md border-default-200">
          {/* User Avatars */}
          <div className="flex -space-x-3 -mr-1">
            {users &&
              users
                .slice(0, 4)
                .map((user) => (
                  <Avatar
                    key={user?._id}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    name={user?.name.charAt(0).toUpperCase()}
                    src={user?.image || undefined}
                  />
                ))}{' '}
          </div>
          +<Code color="primary">TT&DG Community</Code>
        </div>
      </div>
    </section>
  );
};

export default LandingBanner;
