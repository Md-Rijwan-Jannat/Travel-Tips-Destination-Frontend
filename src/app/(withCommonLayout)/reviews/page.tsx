import Loader from "@/src/components/ui/loader";
import React, { Suspense } from "react";
import Reviews from "../_component/module/review";

export default function ReviewsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Reviews />
    </Suspense>
  );
}
