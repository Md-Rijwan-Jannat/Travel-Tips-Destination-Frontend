import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users query
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
  }),
});

export const { useGetAllPaymentsDetailsQuery } = paymentApi;
