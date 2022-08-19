import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch: (state, { payload }) => {
      return payload;
    },
  },
});

export default slice.reducer;

export const { setSearch } = slice.actions;
