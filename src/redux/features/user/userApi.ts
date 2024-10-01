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
  }),
});

export const { useGetAllUsersQuery } = UserApi;
