import { baseApi } from "../../api/baseApi";

export const PostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create post
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["posts"],
    }),
    // Get all post
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery } = PostApi;
