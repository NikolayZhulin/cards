import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI, authReducer } from '../features/auth'
import { paginationApi } from '../features/packs/pagination-api'
import { paginationReducer } from '../features/packs/pagination-reducer'
import { packsReducer } from '../features/packs'
import { packsAPI } from '../features/packs/packs-api'
import { profileReducer } from '../features/profile'
import { tablesApi } from '../features/tables/tablesApi'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    pagination: paginationReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [packsAPI.reducerPath]: packsAPI.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [paginationApi.reducerPath]: paginationApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(paginationApi.middleware),
      .prepend(tablesApi.middleware)
      .prepend(packsAPI.middleware),
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
