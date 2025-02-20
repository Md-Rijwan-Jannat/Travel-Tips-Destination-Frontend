import React, { Suspense } from "react";
import PrivacyPolicy from "../_component/module/privacyPolicy";
import Loader from "@/src/components/ui/loader";

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PrivacyPolicy />
    </Suspense>
  );
}
