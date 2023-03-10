import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from './authAPI'

const initialState = {
  registered: false,
  isRecoveryLetterSent: false,
  isLoggedIn: false,
  userId: null as string | null,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    isSentRecoveryLetterAC(state, action: PayloadAction<{ isRecoveryLetterSent: boolean }>) {
      state.isRecoveryLetterSent = action.payload.isRecoveryLetterSent
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authAPI.endpoints.registration.matchFulfilled, (state, {}) => {
        state.registered = true
      })
      .addMatcher(authAPI.endpoints.forgotPassword.matchFulfilled, (state, { payload }) => {
        state.isRecoveryLetterSent = true
      })
      .addMatcher(authAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.userId = payload._id
      })
      .addMatcher(authAPI.endpoints.logOut.matchFulfilled, state => {
        state.isLoggedIn = false
        state.userId = null
      })
      .addMatcher(authAPI.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.userId = payload._id
      })
  },
})

export const authReducer = slice.reducer
export const { isSentRecoveryLetterAC } = slice.actions
