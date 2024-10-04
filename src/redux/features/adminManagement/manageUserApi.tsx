import { baseApi } from "../../api/baseApi";

const manageUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users query
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/users/normal-users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
    }),

    // Get all premium users query
    getAllPremiumUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/users/premium-users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
    }),
    // Update user status mutation
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
    }),

    // Update user role mutation
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllPremiumUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} = manageUserApi;
