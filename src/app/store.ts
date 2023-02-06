import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'

import {loginReducer} from '../features/login'
import {profileReducer} from '../features/profile'
import {registrationReducer} from '../features/registration'

import {appReducer} from './app-reducer'
import {profileAPI} from "../features/profile/profile-api";

export const store = configureStore({
    reducer: {
        app: appReducer,
        login: loginReducer,
        registration: registrationReducer,
        profile: profileReducer,
        [profileAPI.reducerPath]: profileAPI.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(profileAPI.middleware)
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
