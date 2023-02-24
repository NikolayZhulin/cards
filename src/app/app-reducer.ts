import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { errorHandler } from '../common/utils'
import { authAPI } from '../features/auth'
import { cardsApi } from '../features/cards'
import { learnApi } from '../features/learn/learnApi'
import { packsApi } from '../features/packs'

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
      .addMatcher(cardsApi.endpoints.fetchCards.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(cardsApi.endpoints.addCard.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(cardsApi.endpoints.updateCard.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(cardsApi.endpoints.deleteCard.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(packsApi.endpoints.fetchCardsPack.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(packsApi.endpoints.addPack.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(packsApi.endpoints.updatePack.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
      .addMatcher(packsApi.endpoints.deletePack.matchRejected, (state, { payload }) => {
        state.error = errorHandler(payload)
      })
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC } = slice.actions
