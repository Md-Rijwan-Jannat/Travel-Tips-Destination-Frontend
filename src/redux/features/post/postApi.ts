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
    // Get my all post
    getMyPosts: builder.query({
      query: () => ({
        url: "/profile/my-posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    // Get my all premium post
    getMyPremiumPosts: builder.query({
      query: () => ({
        url: "/profile/my-premium-posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
} = PostApi;
