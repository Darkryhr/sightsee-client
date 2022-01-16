import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'vacations',
  initialState: [],
  reducers: {
    setVacations: (state, payload) => {
      state = [...state, payload];
    },
  },
});

export default slice.reducer;

export const { setVacations } = slice.actions;
