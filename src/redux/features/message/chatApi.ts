import { baseApi } from '../../api/baseApi';

const ChatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a chat
    createChat: builder.mutation({
      query: (data) => ({
        url: `/chats`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserChat: builder.query({
      query: () => ({
        url: `/chats`,
        method: 'GET',
      }),
    }),
    getSingleChat: builder.query({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetUserChatQuery,
  useGetSingleChatQuery,
} = ChatsApi;
