import { baseApi } from "../../api/baseApi";

export const PremiumPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPremiumPosts: builder.query({
      query: () => ({
        url: "/posts/premium",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const { useGetAllPremiumPostsQuery } = PremiumPostApi;
