import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { paginationApi } from './pagination-api'

const initialState: {
  isLoading: boolean
} = {
  isLoading: false,
}

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(paginationApi.endpoints.getPacks.matchPending, state => {
        state.isLoading = true
      })
      .addMatcher(paginationApi.endpoints.getPacks.matchFulfilled, state => {
        state.isLoading = false
      })
  },
})

export const paginationReducer = slice.reducer
export const {} = slice.actions
