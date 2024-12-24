'use client';

import React from 'react';
import { Button } from '@nextui-org/button';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-start justify-start">
      <Button
        className="bg-transparent border-none text-default-800"
        startContent={<IoIosArrowRoundBack size={20} />}
        onClick={handleBack}
      >
        Go Back
      </Button>
    </div>
  );
}
