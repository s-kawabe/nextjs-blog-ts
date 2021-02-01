import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncIncrementCounter } from './asyncActions';

export type CounterState = { 
  count: number 
}

export const initialState: CounterState = {
  count: 0 
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decremented: (state) => ({ ...state, count: state.count - 1}),
    incremented: (state) => ({ ...state, count: state.count + 1}),
    reset: (state) => ({ ...state, count: 0 })
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrementCounter.pending, (state) => {
      return {
        ...state,

      }
    })
  }
})

export default counterSlice
