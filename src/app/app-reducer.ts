import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../common/services/helpers'
import { errorHandler } from '../common/utils'
import { authAPI } from '../features/auth/authAPI'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitializedAC: (state, action: PayloadAction<{ status: boolean }>) => {
      state.isInitialized = action.payload.status
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authAPI.endpoints.registration.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(authAPI.endpoints.forgotPassword.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(authAPI.endpoints.login.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(authAPI.endpoints.me.matchFulfilled, (state, {}) => {
        state.isInitialized = true
      })
      .addMatcher(authAPI.endpoints.me.matchRejected, (state, {}) => {
        state.isInitialized = true
      })
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC } = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
