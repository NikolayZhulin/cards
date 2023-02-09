import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { loginReducer } from '../features/login'
import { loginApi } from '../features/login/loginApi'
import { profileReducer } from '../features/profile'
import { profileAPI } from '../features/profile/profile-api'
import { registrationReducer } from '../features/registration'
import { registrationAPI } from '../features/registration/registrationAPI'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(registrationAPI.middleware)
      .prepend(profileAPI.middleware)
      .prepend(loginApi.middleware),
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
