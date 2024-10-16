import { baseApi } from '../../api/baseApi';

const ChatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a group chat
    createGroupChat: builder.mutation({
      query: (data) => ({
        url: `/chats/group`,
        method: 'POST',
        body: data,
      }),
    }),
    // getUserChat: builder.query({
    //   query: () => ({
    //     url: `/chats`,
    //     method: 'GET',
    //   }),
    // }),
  }),
});

export const { useCreateGroupChatMutation } = ChatsApi;
