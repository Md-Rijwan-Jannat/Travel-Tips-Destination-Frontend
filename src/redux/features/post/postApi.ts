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

    like: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/like`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    unLike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/unlike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    disLike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/dislike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    unDislike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/undislike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
  useLikeMutation,
  useUnLikeMutation,
  useDisLikeMutation,
  useUnDislikeMutation,
} = PostApi;
