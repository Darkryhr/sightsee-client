import { configureStore } from '@reduxjs/toolkit';

import { emptySplitApi } from '../services/api';
import authReducer from './authSlice';
import vacationReducer from './vacationSlice';
import followReducer from './followSlice';
import searchReducer from './SearchSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/lib/persistStore';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    vacations: vacationReducer,
    follows: followReducer,
    search: searchReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export const persistor = persistStore(store);
