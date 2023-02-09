import { createSlice } from '@reduxjs/toolkit'

import { newPasswordAPI } from './newPasswordAPI'

const initialState = {}

const slice = createSlice({
  name: 'newPassword',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      newPasswordAPI.endpoints.setNewPassword.matchFulfilled,
      (state, { payload }) => {}
    )
  },
})

export const newPasswordReducer = slice.reducer
export const {} = slice.actions
