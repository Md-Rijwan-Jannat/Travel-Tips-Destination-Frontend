import { baseApi } from "../../api/baseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getSingleUser: builder.query({
      query: (id) => {
        console.log(id);

        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
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
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateMyProfileMutation,
  useGetSingleUserQuery,
  useGetSingleUserPostsQuery,
} = UserApi;
