import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI, authReducer } from '../features/auth'
import { learnReducer } from '../features/learn/learn-reducer'
import { learnApi } from '../features/learn/learnApi'
import { packsReducer } from '../features/packs/packs-reducer'
import { profileReducer } from '../features/profile'
import { tablesApi } from '../features/tables'
import { cardsReducer } from '../features/tables/cards-reducer'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    learn: learnReducer,
    packs: packsReducer,
    cards: cardsReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [learnApi.reducerPath]: learnApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(tablesApi.middleware)
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
