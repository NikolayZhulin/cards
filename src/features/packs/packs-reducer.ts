import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { packsAPI } from './packs-api'

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
    builder.addMatcher(packsAPI.endpoints.getPacks.matchFulfilled, state => {
      state.isLoading = true
    })
  },
})

export const packsReducer = slice.reducer
export const {} = slice.actions
