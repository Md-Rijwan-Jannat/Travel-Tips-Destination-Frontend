import { baseApi } from "../../api/baseApi";

const manageReactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users query
    getAllLikes: builder.query({
      query: () => {
        return {
          url: `/react/post/likes`,
          method: "GET",
        };
      },
      providesTags: ["posts", "reacts"],
    }),

    // Get all users query
    getAllDislikes: builder.query({
      query: () => {
        return {
          url: `/react/post/dislikes`,
          method: "GET",
        };
      },
      providesTags: ["posts", "reacts"],
    }),
  }),
});

export const { useGetAllDislikesQuery, useGetAllLikesQuery } = manageReactsApi;
