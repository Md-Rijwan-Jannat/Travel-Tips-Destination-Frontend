'use client';

import { Card, CardBody } from '@nextui-org/card';
import Image from 'next/image';
import { useUser } from '@/src/hooks/useUser';
import { CreateStoryModal } from './createStoryModal';

export function CreateStoryCard() {
  const { userInfo } = useUser();

  return (
    <>
      <Card className="w-28 h-48 cursor-pointer relative group hover:opacity-95 transition-opacity overflow-y-hidden border border-default-100">
        <CardBody className="p-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
          {userInfo?.image ? (
            <Image
              width={600}
              height={600}
              src={userInfo.image}
              alt={'Your story'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-[100px]">
                {userInfo?.name?.charAt(0).toUpperCase()}
              </h1>
            </div>
          )}

          <div className="flex flex-col items-center justify-center z-10 w-full bg-default-50 absolute bottom-0 pb-2">
            <CreateStoryModal />
            <p className="text-xs font-medium text-default-700 whitespace-nowrap">
              Create story
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
