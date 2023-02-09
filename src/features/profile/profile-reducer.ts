import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../auth/authAPI'

import { profileAPI, UserType } from './profile-api'

const initialState: {
  user: UserType
  isLoading: boolean
  isLoggedIn: boolean
} = {
  user: {
    _id: '',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    publicCardPacksCount: 0, // количество колод

    created: '',
    updated: '',
    isAdmin: false,
    verified: true, // подтвердил ли почту
    rememberMe: true,
    __v: 0,
    token: '',
    tokenDeathTime: null,
  },
  isLoading: false,
  isLoggedIn: true,
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authAPI.endpoints.me.matchFulfilled, (state, { payload }) => {
      state.user = payload
      state.isLoading = false
      state.isLoggedIn = true
    }),
      builder.addMatcher(authAPI.endpoints.me.matchPending, state => {
        state.isLoading = true
      }),
      builder.addMatcher(authAPI.endpoints.me.matchRejected, state => {
        state.isLoading = false
        state.isLoggedIn = false
      }),
      builder.addMatcher(profileAPI.endpoints.changeUser.matchFulfilled, (state, { payload }) => {
        state.user.name = payload.updatedUser.name
        state.user.avatar = payload.updatedUser.avatar
      }),
      builder.addMatcher(authAPI.endpoints.logOut.matchFulfilled, (state, { payload }) => {
        state.isLoggedIn = false
        state.isLoading = false
      }),
      builder.addMatcher(authAPI.endpoints.logOut.matchPending, (state, { payload }) => {
        state.isLoading = true
      })
  },
})

export const profileReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
