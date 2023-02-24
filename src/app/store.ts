import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI, authReducer } from '../features/auth'
import { cardsApi } from '../features/cards'
import { learnReducer } from '../features/learn/learn-reducer'
import { learnApi } from '../features/learn/learnApi'
import { packsApi } from '../features/packs'
import { profileReducer } from '../features/profile'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    learn: learnReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [learnApi.reducerPath]: learnApi.reducer,
    [packsApi.reducerPath]: packsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(cardsApi.middleware)
      .prepend(packsApi.middleware)
      .prepend(learnApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// @ts-ignore
window.store = store
