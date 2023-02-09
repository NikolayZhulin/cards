import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(profileAPI.endpoints.getUserProfile.matchFulfilled, (state, { payload }) => {
      state.user = payload
      state.isLoading = false
      state.isLoggedIn = true
    }),
      builder.addMatcher(profileAPI.endpoints.getUserProfile.matchPending, state => {
        state.isLoading = true
      }),
      builder.addMatcher(profileAPI.endpoints.getUserProfile.matchRejected, state => {
        state.isLoading = false
        state.isLoggedIn = false
      }),
      builder.addMatcher(profileAPI.endpoints.changeUser.matchFulfilled, (state, { payload }) => {
        state.user.name = payload.updatedUser.name
        state.user.avatar = payload.updatedUser.avatar
      }),
      builder.addMatcher(profileAPI.endpoints.logOut.matchFulfilled, (state, { payload }) => {
        state.isLoggedIn = false
        state.isLoading = false
      }),
      builder.addMatcher(profileAPI.endpoints.logOut.matchPending, (state, { payload }) => {
        state.isLoading = true
      })
  },
})

export const profileReducer = slice.reducer
export const {} = slice.actions
