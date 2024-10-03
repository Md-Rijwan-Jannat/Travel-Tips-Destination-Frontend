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
    // Add comment
    addCommentsForPosts: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
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
  useAddCommentsForPostsMutation,
  useReplayCommentsForPostsMutation,
} = CommentApi;
