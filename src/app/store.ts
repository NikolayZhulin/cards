import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { loginReducer, loginApi } from '../features/login'
import { profileReducer } from '../features/profile'
import { registrationReducer } from '../features/registration'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(thunkMiddleware).prepend(loginApi.middleware),
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
