import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'follow',
  initialState: [],
  reducers: {
    setFollows: (state, { payload }) => {
      return [...state, ...payload];
    },
    addFollow: (state, { payload }) => {
      return [...state, payload];
    },
    removeFollow: (state, { payload }) => {
      return [...state.filter(id => id !== payload)];
    },
    clearFollows: () => {
      return [];
    },
  },
});

export default slice.reducer;

export const { setFollows, addFollow, removeFollow, clearFollows } =
  slice.actions;
