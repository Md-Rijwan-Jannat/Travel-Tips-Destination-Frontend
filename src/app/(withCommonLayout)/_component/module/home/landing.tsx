import { FC } from "react";
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";
import { GoHeart } from "react-icons/go";

type TLandingBannerProps = object;

const LandingBanner: FC<TLandingBannerProps> = () => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 overflow-hidden h-[760px] md:h-[90vh]">
      {/* Main Content */}
      <div className="flex text-pink-500">
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
        <GoHeart className="animate-pulse duration-500" size={35} />
      </div>
      <div className="inline-block max-w-xl text-center justify-center z-10 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-default-900">
          Embark on Your Ultimate Adventure
        </h1>
        <div className="text-lg md:text-xl mt-4 text-default-800">
          Discover breathtaking destinations, share travel stories, and create
          unforgettable memories with fellow explorers.
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 z-10 animate-fade-in-up">
        <CButton
          bgColor={primaryColor}
          link="/news-feed/posts"
          text="Explore Now"
        />
        <CButton bgColor={secondaryColor} link="/docs" text="Learn More" />
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-6 mt-6 z-10">
        <FaFacebook
          className="text-blue-600 hover:scale-110 transition-transform"
          size={28}
        />
        <FaInstagram
          className="text-pink-500 hover:scale-110 transition-transform"
          size={28}
        />
        <FaTwitter
          className="text-blue-400 hover:scale-110 transition-transform"
          size={28}
        />
      </div>

      {/* Snippet */}
      <div className="mt-8 z-10 animate-fade-in-up">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started with <Code color="primary">TT&DG Community</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
};

export default LandingBanner;
