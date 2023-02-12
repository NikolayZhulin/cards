import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from '../features/auth/auth-reducer'
import { authAPI } from '../features/auth/authAPI'
import { packsAPI } from '../features/packs/packs-api'
import { packsReducer } from '../features/packs/packs-reducer'
import { profileReducer } from '../features/profile'
import { profileAPI } from '../features/profile/profile-api'

import { appReducer } from './app-reducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [packsAPI.reducerPath]: packsAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
      .prepend(authAPI.middleware)
      .prepend(profileAPI.middleware)
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
