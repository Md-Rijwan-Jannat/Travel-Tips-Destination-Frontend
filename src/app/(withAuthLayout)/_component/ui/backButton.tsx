import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function BackButton() {
  return (
    <div className="flex items-start justify-start">
      <Button
        className="bg-transparent border-none text-default-800"
        startContent={<IoIosArrowRoundBack size={20} />}
        as={Link}
        href="/"
      >
        Go Back
      </Button>
    </div>
  );
}
