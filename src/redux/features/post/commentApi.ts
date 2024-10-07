import { baseApi } from "../../api/baseApi";

export const CommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get comments
    getCommentsForPosts: builder.query({
      query: (postId) => ({
        url: `/comments/${postId}`,
        method: "GET",
      }),
      providesTags: ["comments", "posts", "users"],
    }),

    // Get comments
    getAllComments: builder.query({
      query: () => ({
        url: `/comments/all-comments`,
        method: "GET",
      }),
      providesTags: ["comments", "posts", "users"],
    }),

    // Add comment
    addCommentsForPosts: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments", "posts", "users"],
    }),

    // Add comment
    updateCommentsForPosts: builder.mutation({
      query: (args) => ({
        url: `/comments/${args.commentId}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comments", "posts", "users"],
    }),

    // Add comment
    deleteCommentsForPosts: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}?sort=-createdAt`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments", "posts", "users"],
    }),

    // Replay comment
    replayCommentsForPosts: builder.mutation({
      query: (args) => ({
        url: `/comments/${args.commentId}/reply`,
        method: "POST",
        body: args.data,
      }),
      invalidatesTags: ["comments", "posts", "users"],
    }),
  }),
});

export const {
  useGetCommentsForPostsQuery,
  useGetAllCommentsQuery,
  useAddCommentsForPostsMutation,
  useUpdateCommentsForPostsMutation,
  useDeleteCommentsForPostsMutation,
  useReplayCommentsForPostsMutation,
} = CommentApi;
