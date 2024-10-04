import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["users"],
    }),

    // Register mutation
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["users"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => {
        console.log("credentials===>", credentials);

        return {
          url: "/auth/forget-password",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["users"],
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `${credentials.token}`,
        },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

// Exporting the hooks to use in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
