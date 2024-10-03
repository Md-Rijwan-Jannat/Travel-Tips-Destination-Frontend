import { TPaymentData } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const SubscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startPaymentProcess: builder.mutation<
      any,
      { userId: string; paymentData: TPaymentData }
    >({
      query: ({ userId, paymentData }) => ({
        url: `/payment/subscriptions/${userId}`,
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useStartPaymentProcessMutation } = SubscriptionsApi;
