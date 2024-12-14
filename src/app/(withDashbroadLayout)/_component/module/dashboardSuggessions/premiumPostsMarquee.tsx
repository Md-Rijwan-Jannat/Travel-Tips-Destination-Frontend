import React from "react";
import Marquee from "react-fast-marquee";
import { TPost } from "@/src/types";
import PremiumPostSuggestionCard from "./premiumPostSuggestionCard";

interface PremiumPostsMarqueeProps {
  posts: TPost[];
}

export default function PremiumPostsMarquee({
  posts,
}: PremiumPostsMarqueeProps) {
  return (
    <div className="w-full my-5 block lg:hidden">
      <Marquee
        pauseOnHover={true} // Stops scrolling on hover
        gradient={false} // Disable gradient for a cleaner look
        speed={50} // Speed of the marquee scroll
      >
        {posts?.map((post) => (
          <div key={post._id} className="mx-2">
            <PremiumPostSuggestionCard post={post} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
