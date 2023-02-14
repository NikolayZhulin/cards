import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI, authReducer } from '../features/auth'
import { paginationReducer } from '../features/packs'
import { paginationApi } from '../features/packs/pagination-api'
import { profileReducer } from '../features/profile'
import { tablesApi } from '../features/tables/tablesApi'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [paginationApi.reducerPath]: paginationApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(paginationApi.middleware)
      .prepend(tablesApi.middleware),
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
