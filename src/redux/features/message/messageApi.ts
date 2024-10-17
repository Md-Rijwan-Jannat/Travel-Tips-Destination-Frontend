import { baseApi } from '../../api/baseApi';

const MessagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['chats', 'messages'],
    }),
    getUserMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/${chatId}`,
        method: 'GET',
      }),
      providesTags: ['chats', 'messages'],
    }),
  }),
});

export const { useCreateMessageMutation, useGetUserMessagesQuery } =
  MessagesApi;
