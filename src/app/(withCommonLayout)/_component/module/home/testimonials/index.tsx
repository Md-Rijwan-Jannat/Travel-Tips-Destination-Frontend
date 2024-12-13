'use client';

import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { Progress } from '@nextui-org/progress';

const testimonials = [
  {
    quote:
      'Natoque nisl dolorem dolor modi eligendi esse nibh ultricies integer, officiis at sem porta vitae.',
    name: 'Miley Houdson',
    role: 'Client',
    image: '/placeholder.svg?height=64&width=64',
    variant: 'white',
  },
  {
    quote:
      'Natoque nisl dolorem dolor modi eligendi esse nibh ultricies integer, officiis at sem porta vitae.',
    name: 'James Scott',
    role: 'Client',
    image: '/placeholder.svg?height=64&width=64',
    variant: 'pink',
  },
  {
    quote:
      'Natoque nisl dolorem dolor modi eligendi esse nibh ultricies integer, officiis at sem porta vitae.',
    name: 'John Henry',
    role: 'Client',
    image: '/placeholder.svg?height=64&width=64',
    variant: 'pink',
  },
  {
    quote:
      'Natoque nisl dolorem dolor modi eligendi esse nibh ultricies integer, officiis at sem porta vitae.',
    name: 'Tina South',
    role: 'Client',
    image: '/placeholder.svg?height=64&width=64',
    variant: 'white',
  },
];

const stats = [
  { label: 'Project Success rate', value: 85 },
  { label: 'Brand Marketing', value: 95 },
];

export default function Testimonials() {
  return (
    <section className="mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-6 ${
                testimonial.variant === 'pink'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <blockquote className="text-sm">
                    {testimonial.quote}
                  </blockquote>
                  <div
                    className={
                      testimonial.variant === 'pink'
                        ? 'text-white/90'
                        : 'text-gray-600'
                    }
                  >
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-pink-500">
              Amazing Response From Our Clients
            </h2>
            <p className="text-gray-600">
              Omnis quis sunt quasi aliquet senectus tenetur dolor! Omnis!
              Corrupti, est arcu, felis, molestiae impedit vel felis eget.
            </p>
          </div>

          <div className="space-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">
                    {stat.label}
                  </span>
                  <span className="text-pink-500">{stat.value}%</span>
                </div>
                <Progress
                  value={stat.value}
                  color="danger"
                  className="h-2"
                  aria-label={stat.label}
                />
              </div>
            ))}
          </div>

          <Button
            color="secondary"
            variant="solid"
            radius="full"
            size="lg"
            className="font-medium"
          >
            MORE REVIEWS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
