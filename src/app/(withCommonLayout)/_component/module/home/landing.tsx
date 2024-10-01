import { FC } from "react";
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";

import { subtitle, title } from "../../../../../components/ui/primitives";

import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";

type TLandingBannerProps = object;

const LandingBanner: FC<TLandingBannerProps> = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative overflow-hidden h-[500px] md:h-screen">
      <div className="absolute inset-0" />
      <div className="inline-block max-w-xl text-center justify-center z-10">
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

      <div className="flex gap-3 z-10">
        <CButton bgColor={primaryColor} link="#" text="Explore Now" />
        <CButton bgColor={secondaryColor} link="#" text="Learn More" />
      </div>

      <div className="mt-8 z-10">
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
