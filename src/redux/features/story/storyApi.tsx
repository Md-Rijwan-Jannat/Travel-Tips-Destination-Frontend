import { ReactionType, TAllUserStory, TStory } from '@/src/types';
import { baseApi } from '../../api/baseApi';

interface UpdateStoryArgs {
  storyId: string;
  data: Partial<TStory>;
}

interface AddViewArgs {
  storyId: string;
}

export const StoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new story
    createStory: builder.mutation({
      query: ({ media }) => ({
        url: '/stories',
        method: 'POST',
        body: { media },
      }),
      invalidatesTags: ['stories'],
    }),

    // Get user stories
    getUserStories: builder.query<any, void>({
      query: () => ({
        url: '/stories',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(
                ({ _id }: any) => ({ type: 'stories', _id }) as const
              ),
              { type: 'stories', _id: 'LIST' },
            ]
          : [{ type: 'stories', _id: 'LIST' }],
    }),

    // Get user stories
    getAllUserStories: builder.query<any, void>({
      query: () => ({
        url: '/stories/all-users-stories',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(
                ({ _id }: any) => ({ type: 'stories', _id }) as const
              ),
              { type: 'stories', _id: 'LIST' },
            ]
          : [{ type: 'stories', _id: 'LIST' }],
    }),

    // Get single story
    getSingleStory: builder.query<any, void>({
      query: (storyId) => ({
        url: `/stories/${storyId}`,
        method: 'GET',
      }),
      providesTags: ['stories'],
    }),

    // Update a story
    updateStory: builder.mutation<void, UpdateStoryArgs>({
      query: ({ storyId, data }) => ({
        url: `/stories/${storyId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['stories'],
    }),

    // Add a view to a story
    addView: builder.mutation<void, AddViewArgs>({
      query: ({ storyId }) => ({
        url: `/stories/${storyId}/view`,
        method: 'POST',
      }),
      invalidatesTags: ['stories'],
    }),

    // Add a reaction to a story
    addReaction: builder.mutation({
      query: ({ storyId, reaction }) => ({
        url: `/stories/${storyId}/reaction`,
        method: 'POST',
        body: { type: reaction },
      }),
      invalidatesTags: ['stories'],
    }),

    // Delete a story
    deleteStory: builder.mutation<void, string>({
      query: (storyId) => ({
        url: `/stories/${storyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, storyId) => [
        { type: 'stories', _id: storyId },
        { type: 'stories', _id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateStoryMutation,
  useGetUserStoriesQuery,
  useGetAllUserStoriesQuery,
  useGetSingleStoryQuery,
  useUpdateStoryMutation,
  useAddViewMutation,
  useAddReactionMutation,
  useDeleteStoryMutation,
} = StoryApi;
