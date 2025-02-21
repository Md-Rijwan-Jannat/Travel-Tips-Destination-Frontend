import { Suspense, lazy } from "react";
import Loader from "@/src/components/ui/loader";
import Testimonials from "./_component/module/home/testimonials";

// Lazy load components
const LandingBanner = lazy(
  () => import("@/src/app/(withCommonLayout)/_component/module/home/landing")
);
const FeaturesSection = lazy(
  () => import("./_component/module/home/featuresSection")
);
const ServiceSection = lazy(
  () => import("./_component/module/home/serviceSection")
);
const EssentialDestination = lazy(
  () => import("./_component/module/home/essentialDestinations")
);
const GoOnSection = lazy(() => import("./_component/module/home/goOnSection"));
const SubscriptionSection = lazy(
  () => import("./_component/module/home/goOnSection/subscribtionSection")
);

export default function Home() {
  return (
    <div className="px-2 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        <LandingBanner />
        {/* <WhyWeAre /> */}
        <FeaturesSection />
        <ServiceSection />
        <EssentialDestination />
        <GoOnSection />
        <SubscriptionSection />
        <Testimonials />
      </Suspense>
    </div>
  );
}
