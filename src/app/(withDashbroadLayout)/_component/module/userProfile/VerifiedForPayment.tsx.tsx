import React from "react";
import { motion } from "framer-motion";
import { GoVerified } from "react-icons/go";
import { useStartPaymentProcessMutation } from "@/src/redux/features/payment/subscriptionsApi";
import { TPaymentData, TUser } from "@/src/types";

interface TVerifiedForPaymentProps {
  user: TUser | undefined;
}

export default function VerifiedForPayment({ user }: TVerifiedForPaymentProps) {
  const [startPaymentProcess, { isLoading }] = useStartPaymentProcessMutation();

  const handleVerifyClick = async () => {
    if (!user) return;

    const paymentData: TPaymentData = {
      user: user._id!,
      amount: 1000,
      customerName: user.name!,
      customerEmail: user.email!,
      customerAddress: user.address!,
      customerCountry: user.country || "N/A",
      customerNumber: "N/A",
    };

    try {
      const response = await startPaymentProcess({
        userId: user._id!,
        paymentData,
      }).unwrap();

      console.log("Payment started:", response);

      if (response.success && response.data.paymentResponse.payment_url) {
        // Navigate to the payment URL
        window.location.href = response.data.paymentResponse.payment_url;
      }
    } catch (error) {
      console.error("Error starting payment process:", error);
    }
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      onClick={handleVerifyClick}
      className="text-xs text-default-500 font-semibold flex items-center justify-center gap-1 border border-dashed border-primaryColor px-2 py-1 rounded-full cursor-pointer mt-1"
    >
      <GoVerified className="text-primaryColor" size={16} />
      {isLoading ? "Processing..." : "Verify Now"}
    </motion.span>
  );
}
