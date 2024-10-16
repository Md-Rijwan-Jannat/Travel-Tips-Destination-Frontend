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
    // Update post
    updatePost: builder.mutation({
      query: (args) => ({
        url: `/posts/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["posts"],
    }),

    // Get all premium users query
    getAllPosts: builder.query({
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

    // Get all post
    getSinglePost: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["posts", "comments"],
    }),
    // Get my all post
    getMyPosts: builder.query({
      query: () => ({
        url: "/profile/my-posts",
        method: "GET",
      }),
      providesTags: ["posts", "comments", "users"],
    }),
    // Get my all premium post
    getMyPremiumPosts: builder.query({
      query: () => ({
        url: "/profile/my-premium-posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    // Soft Delete post
    softDeletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    reportPost: builder.mutation({
      query: ({ postId, reason }) => ({
        url: `/posts/report/${postId}`,
        method: "PUT",
        body: { reason },
      }),
      invalidatesTags: ["users", "posts", "comments", "reacts"],
    }),
    like: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/like`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts", "comments", "reacts"],
    }),

    getAllReacts: builder.query({
      query: () => {
        return {
          url: `/react`,
          method: "GET",
        };
      },
      providesTags: ["users", "posts", "comments", "reacts"],
    }),
    unLike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/unlike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts", "comments", "reacts"],
    }),

    disLike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/dislike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts", "comments", "reacts"],
    }),

    unDislike: builder.mutation({
      query: (userId) => {
        return {
          url: `/react/post/${userId}/undislike`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts", "comments", "reacts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
  useSoftDeletePostMutation,
  useReportPostMutation,
  useLikeMutation,
  useUnLikeMutation,
  useDisLikeMutation,
  useUnDislikeMutation,
} = PostApi;
