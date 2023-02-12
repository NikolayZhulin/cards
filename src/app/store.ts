import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI, authReducer } from '../features/auth'
import { profileReducer } from '../features/profile'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(thunkMiddleware).prepend(authAPI.middleware),
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
