import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice/userSlice';
import feedReducer from './slices/feedSlice/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice/ingredientsSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import orderReducer from './slices/orderSlice/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructorbg: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
