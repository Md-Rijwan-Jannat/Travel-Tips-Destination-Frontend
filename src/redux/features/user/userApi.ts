import { baseApi } from "../../api/baseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users", "posts"],
    }),

    getSingleUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users", "posts"],
    }),

    getSingleUserPosts: builder.query({
      query: (id) => {
        return {
          url: `/users/posts/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    updateMyProfile: builder.mutation({
      query: (args) => {
        return {
          url: `/profile/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    follow: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/follow/${userId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),
    unFollow: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/un-follow/${userId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateMyProfileMutation,
  useGetSingleUserQuery,
  useGetSingleUserPostsQuery,
  useFollowMutation,
  useUnFollowMutation,
} = UserApi;
