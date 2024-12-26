'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';

export type TDestinationCard = {
  id: string;
  name: string;
  rating: number;
  category: string;
  icon: string;
  description: string;
  longDescription: string;
  bestSeason: string;
  highlights: string[];
  activities: string[];
  averageCost: string;
};

type Props = {
  destinations: TDestinationCard[];
};

export default function DestinationGrid({ destinations }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto p-4">
      {destinations.map((destination, index) => (
        <Card
          key={index}
          className="h-full transition-transform duration-200 rounded-md shadow-lg border border-default-200"
        >
          <CardBody className="p-0">
            <Image
              src={destination.icon}
              alt={destination.name}
              width={1000}
              height={1000}
              className="w-full h-48 object-cover rounded-t-md"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-start py-4 px-2 md:px-4">
            <div className="flex flex-row items-center justify-between gap-3 w-full">
              <div className="flex items-start flex-col">
                <h2 className="text-medium">{destination.name}</h2>
              </div>
              <div className="flex items-start flex-col">
                <p className="text-sm text-default-700">
                  ( {destination.category} )
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{destination.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full mt-5">
              <Button
                as={Link}
                href={`/destinations/${destination.id}`}
                className="secondary-button"
              >
                {' '}
                View Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
