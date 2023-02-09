import { createSlice } from '@reduxjs/toolkit'

import { authAPI } from '../authAPI'

const initialState = {}

const slice = createSlice({
  name: 'newPassword',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(authAPI.endpoints.setNewPassword.matchFulfilled, (state, { payload }) => {})
  },
})

export const newPasswordReducer = slice.reducer
export const {} = slice.actions
