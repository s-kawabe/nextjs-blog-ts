import { Store, combineReducers } from 'redux'
import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterSlice, { initialState as counterState } from '~/ducks/counter/slice';
import postsSlice, { initialState as postsState } from './posts/slice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  posts: postsSlice.reducer
})

const preloadedState = () => {
  return { 
    counter: counterState,
    posts: postsState
  }
}

export type StoreState = ReturnType<typeof preloadedState>
export type ReduxStore = Store<StoreState>

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  })
}

export default createStore