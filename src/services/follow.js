import { emptySplitApi } from './api';

const followsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowed: builder.mutation({
      query: () => '/follow',
    }),
    addTo: builder.mutation({
      query: (id) => `/follow/${id}`,
    }),
    removeFrom: builder.mutation({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFollowedMutation,
  useAddToMutation,
  useRemoveFromMutation,
} = followsApi;
