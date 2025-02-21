"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Progress } from "@nextui-org/progress";
import { useGetAllReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { TReview } from "@/src/types";
import SectionTitle from "../../../ui/sectionTitle";

const stats = [
  { label: "Project Success rate", value: 85 },
  { label: "Brand Marketing", value: 95 },
];

export default function Testimonials() {
  const { data: reviewData, isLoading } = useGetAllReviewsQuery(undefined);
  const reviews = reviewData?.data?.slice(0, 4) ?? [];

  return (
    <>
      <SectionTitle text="Testimonials" />
      <section className="mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(({ user, quote }: TReview, index: number) => {
              const variant =
                index === 0 || index === 3
                  ? "bg-pink-500 text-white"
                  : "bg-default-50 text-default-700 border border-default-100";

              return (
                <motion.div
                  key={user?.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 ${variant}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={user?.image ?? "/placeholder.svg"}
                        alt={user?.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <blockquote className="text-sm">{quote}</blockquote>
                      <div
                        className={`${index === 0 || index === 3 ? "text-default-50" : "text-default-700"}`}
                      >
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-pink-500">
                Amazing Response From Our Users
              </h2>
              <p className="text-gray-600">
                Omnis quis sunt quasi aliquet senectus tenetur dolor! Omnis!
                Corrupti, est arcu, felis, molestiae impedit vel felis eget.
              </p>
            </div>

            <div className="space-y-6">
              {stats.map(({ label, value }) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{label}</span>
                    <span className="text-pink-500">{value}%</span>
                  </div>
                  <Progress
                    value={value}
                    color="danger"
                    className="h-2"
                    aria-label={label}
                  />
                </div>
              ))}
            </div>

            <Button
              variant="solid"
              radius="full"
              className="font-medium button-primary"
            >
              MORE REVIEWS
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
