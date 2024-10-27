import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from '@nextui-org/skeleton';

const MessageCardSkeleton = () => {
  // Dummy array to create 7 skeletons
  const skeletonArray = new Array(7).fill(0);

  return (
    <div className="grid grid-cols-1 p-2">
      {skeletonArray.map((_, index) => (
        <Card
          key={index}
          className="w-full mb-2 h-20 border border-default-50 rounded-lg"
        >
          <CardBody className="flex flex-row items-center p-2 gap-2">
            {/* Avatar skeleton */}
            <div>
              <Skeleton className="rounded-full size-11 bg-default-200" />
            </div>

            {/* Skeleton content */}
            <div className="flex-grow">
              <Skeleton className="w-24 h-3 bg-default-200 rounded-lg mb-2" />
              <Skeleton className="w-36 h-2 bg-default-100 rounded-lg" />
            </div>

            <Skeleton className="w-16 h-3 bg-default-200 rounded-lg" />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default MessageCardSkeleton;
