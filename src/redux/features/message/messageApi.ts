import { baseApi } from '../../api/baseApi';

const MessagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/${chatId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useGetUserMessagesQuery } =
  MessagesApi;
