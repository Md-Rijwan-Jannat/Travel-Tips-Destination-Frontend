import LandingBanner from '@/src/app/(withCommonLayout)/_component/module/home/landing';
import FeaturesSection from './_component/module/home/featuresSection';
import EssentialAppsSlider from './_component/module/home/essentialAppsSlider';
import SubscriptionSection from './_component/module/home/subscriptionSection';
import SocialMediaSolutionSection from './_component/module/home/socialMediaSolutionSection';

export default function Home() {
  return (
    <div className="px-2 md:px-6 max-w-7xl mx-auto">
      <LandingBanner />
      <EssentialAppsSlider />
      <FeaturesSection />
      <SocialMediaSolutionSection />
      <SubscriptionSection />
    </div>
  );
}
