import { baseApi } from "../../api/baseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/normal-users",
        method: "GET",
      }),
      providesTags: ["users", "posts"],
    }),

    // get single users
    getSingleUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users", "posts"],
    }),

    // get single users posts
    getSingleUserPosts: builder.query({
      query: (id) => {
        return {
          url: `/users/posts/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    // update ny profile
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

    // follow user
    follow: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/follow/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    // un follow user
    unFollow: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/un-follow/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["users", "posts"],
    }),

    // followers
    followers: builder.query({
      query: () => {
        return {
          url: `/profile/followers`,
          method: "GET",
        };
      },
      providesTags: ["users", "posts"],
    }),

    // following
    following: builder.query({
      query: () => {
        return {
          url: `/profile/following`,
          method: "GET",
        };
      },
      providesTags: ["users", "posts"],
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
  useFollowersQuery,
  useFollowingQuery,
} = UserApi;
