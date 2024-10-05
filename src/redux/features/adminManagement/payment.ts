import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all payments sata
    getAllPaymentsDetails: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/payment`,
          method: "GET",
          params,
        };
      },
      providesTags: ["payment"],
    }),

    // Get all payments data
    getAllPaymentsDatForAnalytics: builder.query({
      query: () => {
        return {
          url: `/payment/analytics`,
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useGetAllPaymentsDetailsQuery,
  useGetAllPaymentsDatForAnalyticsQuery,
} = paymentApi;
