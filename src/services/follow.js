import { emptySplitApi } from './api';

const followsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getFollowed: builder.query({
      query: () => '/follow',
    }),
    addTo: builder.mutation({
      query: id => ({
        url: `/follow/${id}`,
        method: 'POST',
      }),
    }),
    removeFrom: builder.mutation({
      query: id => ({
        url: `/follow/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetFollowedQuery, useAddToMutation, useRemoveFromMutation } =
  followsApi;
