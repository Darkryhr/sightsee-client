import { configureStore } from '@reduxjs/toolkit';

import { emptySplitApi } from '../services/api';
import authReducer from './authSlice';
import vacationReducer from './vacationSlice';
import followReducer from './followSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vacations: vacationReducer,
    follows: followReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});
