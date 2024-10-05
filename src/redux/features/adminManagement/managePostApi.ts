import { baseApi } from "../../api/baseApi";

const manageUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users query
    getAllManagePosts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/posts`,
          method: "GET",
          params,
        };
      },
      providesTags: ["posts"],
    }),

    // Get all premium users query
    getAllPremiumManagePosts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/posts/premium`,
          method: "GET",
          params,
        };
      },
      providesTags: ["posts"],
    }),

    // Get all normal users query
    getAllPostsNormalForAnalytics: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/posts/normal-posts-analytics`,
          method: "GET",
          params,
        };
      },
      providesTags: ["posts"],
    }),

    // Get all premium users query
    getAllPostsPremiumForAnalytics: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/posts/premium-posts-analytics`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),
  }),
});

export const {
  useGetAllManagePostsQuery,
  useGetAllPremiumManagePostsQuery,
  useGetAllPostsNormalForAnalyticsQuery,
  useGetAllPostsPremiumForAnalyticsQuery,
} = manageUserApi;
