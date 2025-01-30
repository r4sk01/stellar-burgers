import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import { userInitialState } from './slices/userSlice/userSlice';
import { orderInitialState } from './slices/orderSlice/orderSlice';
import { ingredientsInitialState } from './slices/ingredientsSlice/ingredientsSlice';
import { feedInitialState } from './slices/feedSlice/feedSlice';
import { constructorInitialState } from './slices/constructorSlice/constructorSlice';

const expectedInitialState = {
  user: { ...userInitialState },
  feed: { ...feedInitialState },
  order: { ...orderInitialState },
  ingredients: { ...ingredientsInitialState },
  constructorbg: { ...constructorInitialState }
};

describe('Root Reducer', () => {
  test('[Test] When State Is Undefined and Action is Empty, returns Init State', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(expectedInitialState);
  });

  describe('Individual Slices', () => {
    let state: typeof expectedInitialState;

    beforeAll(() => {
      state = rootReducer(undefined, { type: '@@INIT' });
    });

    test('[TEST] Correct Initial State for User Slice', () => {
      expect(state.user).toEqual(userInitialState);
    });

    test('[TEST] Correct Initial State for Feed Slice', () => {
      expect(state.feed).toEqual(feedInitialState);
    });

    test('[TEST] Correct Initial State for Order Slice', () => {
      expect(state.order).toEqual(orderInitialState);
    });

    test('[TEST] Correct Initial State for Ingredients Slice', () => {
      expect(state.ingredients).toEqual(ingredientsInitialState);
    });

    test('[TEST] Correct Initial State for Constructor Slice', () => {
      expect(state.constructorbg).toEqual(constructorInitialState);
    });
  });
});
