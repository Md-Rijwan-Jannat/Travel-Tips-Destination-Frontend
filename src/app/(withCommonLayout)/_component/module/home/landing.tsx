import { FC } from "react";
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { subtitle, title } from "../../../../../components/ui/primitives";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";

type TLandingBannerProps = object;

const LandingBanner: FC<TLandingBannerProps> = () => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 overflow-hidden h-[400px] md:h-[90vh]">
      {/* Main Content */}
      <div className="inline-block max-w-xl text-center justify-center z-10 animate-fade-in">
        <span className={title()}>Discover&nbsp;</span>
        <span className={title({ color: "violet" })}>Unforgettable&nbsp;</span>
        <br />
        <span className={title()}>
          Destinations & Create Lifelong Memories.
        </span>
        <div className={subtitle({ class: "mt-4 text-default-800" })}>
          Share your travel stories, tips, and connect with fellow explorers.
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
