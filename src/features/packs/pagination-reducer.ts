import { createSlice } from '@reduxjs/toolkit'

const initialState: {} = {}

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {},
})

export const paginationReducer = slice.reducer
export const {} = slice.actions
