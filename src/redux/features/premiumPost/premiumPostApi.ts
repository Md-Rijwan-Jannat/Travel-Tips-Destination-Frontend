import { baseApi } from '../../api/baseApi';

export const PremiumPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPremiumPosts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: `/posts/premium`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['posts'],
    }),
  }),
});

export const { useGetAllPremiumPostsQuery } = PremiumPostApi;
