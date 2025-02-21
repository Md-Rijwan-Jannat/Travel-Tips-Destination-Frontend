"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/card";
import { TReview } from "@/src/types";
import { useGetAllReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { Avatar } from "@nextui-org/avatar";
import StarRating from "../../ui/starRatinh";
import { Pagination } from "@nextui-org/pagination";
import CreateReview from "./createReview";
import { Quote } from "lucide-react";
import Loader from "@/src/components/ui/loader";

const MAX_LENGTH = 100;

export default function Reviews() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [page, setPage] = useState(1);
  const { data: reviewData, isLoading } = useGetAllReviewsQuery({
    page,
    limit: 6,
  });

  const reviews = reviewData?.data ?? [];
  const meta = reviewData?.meta;

  console.log("Review Data", reviews);

  return (
    <div className="min-h-screen bg-white py-12 pt-24 px-6 md:px-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold text-pink-500">
          What Our Travelers Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore real stories and experiences from our travel-loving community.
          Your next adventure starts here!
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {reviews.map((review: TReview) => (
          <motion.div
            key={review._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-lg rounded-2xl border border-gray-200 p-6 h-full">
              <CardBody>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={review.user.image}
                    className="w-16 h-16 border-2 border-pink-500"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {review.user.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{review.user.bio}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 italic">
                  <Quote className="inline-block w-5 h-5 text-pink-500 mr-2" />
                  {isExpanded || review.quote.length <= MAX_LENGTH
                    ? review.quote
                    : `${review.quote.substring(0, MAX_LENGTH)}...`}
                  {review.quote.length > MAX_LENGTH && (
                    <button
                      onClick={toggleExpand}
                      className="ml-2 text-pink-500 hover:underline"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <StarRating rating={review.rating} totalStars={5} />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {isLoading && (
        <div className="flex items-center justify-center w-full h-[200px]">
          <Loader />
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            color="default"
            variant="flat"
            showControls
            total={meta.totalPage}
            page={page}
            onChange={setPage}
            className="mb-5 px-5 py-2 mx-3 border-none shadow-none rounded-full bg-default-50"
          />
        </div>
      )}

      {/* Call to Action */}
      <CreateReview />
    </div>
  );
}

// "use client";
// import { motion } from "framer-motion";
// import { Card, CardBody, CardFooter } from "@nextui-org/card";
// import { Star, Quote } from "lucide-react";
// import { Button } from "@nextui-org/button";
// import { Avatar } from "@nextui-org/avatar";

// const useGetAllReviewsQuery = () => ({
//   data: {
//     data: [
//       {
//         _id: "67b8430d3971faa94933093e",
//         user: {
//           name: "Sumaiya Islam",
//           image:
//             "https://res.cloudinary.com/dihqveqyc/image/upload/v1734290501/g6pp2rogrx32xoanzrso.jpg",
//         },
//         quote: "Good quality but took longer than expected to arrive.",
//         variant: "pink",
//         rating: 4,
//         createdAt: "2025-02-21T09:10:37.591Z",
//       },
//       {
//         _id: "67b842e93971faa949330936",
//         user: {
//           name: "Sumaiya Islam",
//           image:
//             "https://res.cloudinary.com/dihqveqyc/image/upload/v1734290501/g6pp2rogrx32xoanzrso.jpg",
//         },
//         quote: "Good quality but took longer than expected to arrive.",
//         variant: "white",
//         rating: 4,
//         createdAt: "2025-02-21T09:10:01.625Z",
//       },
//     ],
//   },
// });

// export default function Reviews() {
//   const { data: reviewData } = useGetAllReviewsQuery();
//   const reviews = reviewData?.data?.slice(0, 4) ?? [];

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto"
//       >
//         <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
//           Customer Reviews
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card className="h-full">
//                 <CardBody className="flex flex-col justify-between">
//                   <div>
//                     <div className="flex items-center mb-4">
//                       <Avatar
//                         src={review.user.image}
//                         alt={review.user.name}
//                         className="mr-3"
//                       />
//                       <div>
//                         <p className="font-semibold">{review.user.name}</p>
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-4 h-4 ${
//                                 i < review.rating
//                                   ? "text-pink-500 fill-pink-500"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mb-4">
//                       <Quote className="inline-block w-5 h-5 text-pink-500 mr-2" />
//                       {review.quote}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </p>
//                 </CardBody>
//                 <CardFooter>
//                   <Button
//                     color="primary"
//                     variant="flat"
//                     className="w-full bg-pink-500 text-white hover:bg-pink-600"
//                   >
//                     Read Full Review
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="mt-12 text-center"
//         >
//           <Button
//             color="primary"
//             size="lg"
//             className="bg-pink-500 text-white hover:bg-pink-600"
//           >
//             Load More Reviews
//           </Button>
//         </motion.div>
//       </motion.div>

//       <ReviewStatistics />
//       <TestimonialCarousel />
//     </div>
//   );
// }

// function ReviewStatistics() {
//   const stats = [
//     { label: "Average Rating", value: "4.8" },
//     { label: "Total Reviews", value: "1,234" },
//     { label: "5 Star Reviews", value: "80%" },
//     { label: "Satisfied Customers", value: "98%" },
//   ];

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.7 }}
//       className="py-12 bg-pink-50 mt-16"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Review Statistics
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
//               className="bg-white p-6 rounded-lg shadow-md text-center"
//             >
//               <p className="text-4xl font-bold text-pink-500 mb-2">
//                 {stat.value}
//               </p>
//               <p className="text-gray-600">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// function TestimonialCarousel() {
//   const testimonials = [
//     {
//       quote:
//         "This product changed my life! I can't imagine going back to my old routine.",
//       author: "Jane Doe",
//       position: "CEO, TechCorp",
//     },
//     {
//       quote:
//         "The customer service is unparalleled. They went above and beyond to help me.",
//       author: "John Smith",
//       position: "Freelance Designer",
//     },
//     {
//       quote:
//         "I've recommended this to all my friends. It's simply the best in the market.",
//       author: "Emily Johnson",
//       position: "Marketing Manager",
//     },
//   ];

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5, delay: 1 }}
//       className="py-16 bg-gray-900 text-white mt-16"
//     >
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           What Our Customers Say
//         </h2>
//         <div className="relative">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
//               className="mb-8"
//             >
//               <blockquote className="text-xl italic mb-4">
//                 {testimonial.quote}
//               </blockquote>
//               <p className="font-semibold">{testimonial.author}</p>
//               <p className="text-pink-400">{testimonial.position}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }
