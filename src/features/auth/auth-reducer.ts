import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../../common/services/helpers'

import { authAPI } from './authAPI'

const initialState = {
  registered: false,
  error: null as null | string,
  isRecoveryLetterSent: false,
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    isSentRecoveryLetterAC(state, action: PayloadAction<{ isRecoveryLetterSent: boolean }>) {
      state.isRecoveryLetterSent = action.payload.isRecoveryLetterSent
      console.log(state.isRecoveryLetterSent)
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authAPI.endpoints.registration.matchFulfilled, (state, {}) => {
      state.registered = true
    })
    builder.addMatcher(authAPI.endpoints.registration.matchRejected, (state, { payload }) => {
      if (isFetchBaseQueryError(payload)) {
        const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

        state.error = JSON.parse(errMsg).error
      } else if (isErrorWithMessage(payload)) {
        console.warn('Unknown Error')
      }
    })
    builder
      .addMatcher(authAPI.endpoints.forgotPassword.matchFulfilled, (state, { payload }) => {
        state.isRecoveryLetterSent = true
      })
      .addMatcher(authAPI.endpoints.forgotPassword.matchRejected, (state, { payload }) => {
        if (isFetchBaseQueryError(payload)) {
          const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

          state.error = JSON.parse(errMsg).error
        } else if (isErrorWithMessage(payload)) {
          console.warn('Unknown Error')
        }
      })
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.isLoggedIn = true
    })
    builder.addMatcher(authAPI.endpoints.login.matchRejected, (state, { payload }) => {
      if (isFetchBaseQueryError(payload)) {
        const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

        state.error = JSON.parse(errMsg).error
      } else if (isErrorWithMessage(payload)) {
        console.warn('Unknown Error')
      }
    })
    builder.addMatcher(authAPI.endpoints.logOut.matchFulfilled, state => {
      state.isLoggedIn = false
    })
    builder.addMatcher(authAPI.endpoints.me.matchFulfilled, state => {
      state.isLoggedIn = true
    }) // it is important!
  },
})

export const authReducer = slice.reducer
export const { isSentRecoveryLetterAC } = slice.actions
