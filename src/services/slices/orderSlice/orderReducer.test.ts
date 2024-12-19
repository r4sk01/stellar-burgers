import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { getOrderThunk } from './orderSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Экшены Заказа', () => {
  describe('Экшен Получения Данных Заказа', () => {
    test('Ожидание Данных Заказа', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.pending.type });
      const state = store.getState();
      expect(state.order.isLoading).toBeTruthy();
      expect(state.order.error).toBeNull();
    });
    test('Ошибка Получения Данных Заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrderThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBe(error);
    });
    test('Данные Заказа Получены', () => {
      const mockedPayload = {
        orders: [
          {
            _id: '660e81bb97ede0001d0643eb',
            ingredients: [
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093d'
            ],
            owner: '65db1c0a97ede0001d05e2d6',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2024-12-12T10:32:27.595Z',
            updatedAt: '2024-12-12T10:32:28.181Z',
            number: 37596
          }
        ]
      };
      const store = setupStore();
      store.dispatch({
        type: getOrderThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBeNull();
      expect(state.order.order).toEqual(mockedPayload.orders[0]);
    });
  });
});
