import { createSlice } from '@reduxjs/toolkit'

import { authAPI, UserType } from '../auth'

const initialState: {
  user: UserType
  isLoading: boolean
} = {
  user: {
    _id: '',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    publicCardPacksCount: 0,

    created: '',
    updated: '',
    isAdmin: false,
    verified: true,
    rememberMe: true,
    __v: 0,
    token: '',
    tokenDeathTime: null,
  },
  isLoading: false,
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(authAPI.endpoints.me.matchPending, state => {
        state.isLoading = true
      })
      .addMatcher(authAPI.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoading = false
      })
      .addMatcher(authAPI.endpoints.me.matchRejected, state => {
        state.isLoading = false
      })
  },
})

export const profileReducer = slice.reducer
export const {} = slice.actions
