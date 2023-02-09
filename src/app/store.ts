import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authAPI } from '../features/auth/authAPI'
import { loginReducer } from '../features/auth/login'
import { registrationReducer } from '../features/auth/registration'
import { profileReducer } from '../features/profile'
import { profileAPI } from '../features/profile/profile-api'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(profileAPI.middleware),
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
