import { baseApi } from '../../api/baseApi';

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reviews
    getAllReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: '/reviews',
          method: 'GET',
          params,
        };
      },
      providesTags: ['reviews'],
    }),

    // Create a review
    createReview: builder.mutation({
      query: (data) => {
        return {
          url: '/reviews',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['reviews'],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ reviewId, data }) => {
        return {
          url: `/reviews/${reviewId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['reviews'],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (reviewId) => {
        return {
          url: `/reviews/${reviewId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['reviews'],
    }),

    // Get a single review by ID
    getSingleReview: builder.query({
      query: (reviewId) => {
        return {
          url: `/reviews/${reviewId}`,
          method: 'GET',
        };
      },
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetSingleReviewQuery,
} = ReviewApi;
