import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncIncrementCounter } from './asyncActions';

export type CounterState = { 
  count: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const initialState: CounterState = {
  count: 0,
  loading: false,
  error: false,
  errorMessage: '',
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
        loading: true,
        error: false,
        errorMessage: '',
      }
    }),
    builder.addCase(
      asyncIncrementCounter.rejected,
      (state, action: RejectedAction<number>) => {
        return {
          ...state,
          loadgind: false,
          error: true,
          errorMessage: action.error.message,
        }
      }
    ),
    builder.addCase(
      asyncIncrementCounter.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          count: state.count + action.payload,
          loading: false,
          error: false,
          errorMessage: ''
        }
      }
    )
  }
})

export default counterSlice
