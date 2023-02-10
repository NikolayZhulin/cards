import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../../common/services/helpers'

import { registrationAPI } from './registrationAPI'

const initialState = {
  registered: false,
  error: null as null | string,
  isRecoveryLetterSent: false,
}

const slice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    addRegistrationAC(state, action: PayloadAction<{ registered: boolean }>) {
      state.registered = action.payload.registered
    },
    isSentRecoveryLetterAC(state, action: PayloadAction<{ isRecoveryLetterSent: boolean }>) {
      state.isRecoveryLetterSent = action.payload.isRecoveryLetterSent
      console.log(state.isRecoveryLetterSent)
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      registrationAPI.endpoints.registration.matchFulfilled,
      (state, { payload }) => {
        state.registered = true
      }
    )
    builder.addMatcher(
      registrationAPI.endpoints.registration.matchRejected,
      (state, { payload }) => {
        if (isFetchBaseQueryError(payload)) {
          const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

          state.error = JSON.parse(errMsg).error
        } else if (isErrorWithMessage(payload)) {
          console.warn('Unknown Error')
        }
      }
    )
    builder
      .addMatcher(registrationAPI.endpoints.forgotPassword.matchFulfilled, (state, { payload }) => {
        state.isRecoveryLetterSent = true
      })
      .addMatcher(registrationAPI.endpoints.forgotPassword.matchRejected, (state, { payload }) => {
        if (isFetchBaseQueryError(payload)) {
          const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

          state.error = JSON.parse(errMsg).error
        } else if (isErrorWithMessage(payload)) {
          console.warn('Unknown Error')
        }
      })
  },
})

export const registrationReducer = slice.reducer
export const { isSentRecoveryLetterAC } = slice.actions
