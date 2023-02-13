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
    // .addMatcher(profileAPI.endpoints.changeUser.matchFulfilled, (state, { payload }) => {
    //   state.user.name = payload.updatedUser.name
    //   state.user.avatar = payload.updatedUser.avatar
    // })
  },
})

export const profileReducer = slice.reducer
export const {} = slice.actions
