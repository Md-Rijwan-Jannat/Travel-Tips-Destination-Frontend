import React, { Suspense } from "react";
import TermsOfService from "../_component/module/TermsOfService";
import Loader from "@/src/components/ui/loader";

export default function TermsOfServicePage() {
  return (
    <Suspense fallback={<Loader />}>
      <TermsOfService />
    </Suspense>
  );
}
