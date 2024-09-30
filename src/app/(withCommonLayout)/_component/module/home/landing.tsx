import { FC } from "react";
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";
import { subtitle, title } from "../../../../../components/ui/primitives";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";

type TLandingBannerProps = object;

const LandingBanner: FC<TLandingBannerProps> = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>
0
      <div className="flex gap-3">
        <CButton text="News Feed" link="#" bgColor={primaryColor} />
        <CButton text="Learn More" link="#" bgColor={secondaryColor} />
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
};

export default LandingBanner;
