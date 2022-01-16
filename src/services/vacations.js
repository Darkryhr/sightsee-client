import { emptySplitApi } from './api';

const vacationsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVacations: builder.query({
      query: () => '/vacation',
    }),
  }),
});

export const { useGetAllVacationsQuery } = vacationsApi;
