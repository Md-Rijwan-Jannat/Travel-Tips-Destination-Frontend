"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import MarketingAnalytics from "./marketingAnalytics";
import SocialMediaAnalytics from "./socialMediaAnalytics";

export default function Analytics() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Analytics Options">
        <Tab key="social-media" title="Social Media">
          <SocialMediaAnalytics />
        </Tab>
        <Tab key="marketing" title="Marketing">
          <MarketingAnalytics />
        </Tab>
      </Tabs>
    </div>
  );
}
