import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { errorHandler } from '../common/utils'
import { authAPI } from '../features/auth'
import { learnApi } from '../features/learn/learnApi'

const initialState = {
  error: null as null | string,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
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
      .addMatcher(learnApi.endpoints.updateGrade.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
    //     .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
    //       state.error = errorHandler(payload)
    //     })
    //     .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
    //       state.error = errorHandler(payload)
    //     })
    //     .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
    //       state.error = errorHandler(payload)
    //     })
    //     .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
    //       state.error = errorHandler(payload)
    //     })
    //     .addMatcher(learnApi.endpoints.fetchAllCards.matchRejected, (state, { payload }) => {
    //       state.error = errorHandler(payload)
    //     })
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC } = slice.actions
