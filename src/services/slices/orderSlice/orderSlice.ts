import { getOrderByNumberApi } from '@api';
import { OrderState } from './types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: OrderState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrderThunk = createAsyncThunk(
  'feed/getOrder',
  (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.orders[0];
      });
  }
});

export { initialState as orderInitialState };
export const { getOrderSelector } = orderSlice.selectors;

export default orderSlice.reducer;
