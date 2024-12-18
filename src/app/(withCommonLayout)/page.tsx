import LandingBanner from '@/src/app/(withCommonLayout)/_component/module/home/landing';
import FeaturesSection from './_component/module/home/featuresSection';
import EssentialAppsSlider from './_component/module/home/essentialAppsSlider';
import SubscriptionSection from './_component/module/home/subscriptionSection';
import SocialMediaSolutionSection from './_component/module/home/socialMediaSolutionSection';
import OurService from './_component/module/home/ourService';
import Testimonials from './_component/module/home/testimonials';
import WhyWeAre from './_component/module/home/whyWeAre';

export default function Home() {
  return (
    <div className="px-2 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
      <LandingBanner />
      {/* <WhyWeAre /> */}
      <FeaturesSection />
      <OurService />
      <EssentialAppsSlider />
      <SocialMediaSolutionSection />
      <SubscriptionSection />
      {/* <Testimonials /> */}
    </div>
  );
}
