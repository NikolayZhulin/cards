import { createSlice } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../../../common/services/helpers'
import { setIsLoggedIn } from '../../profile'
import { authAPI, ResponseLoginType } from '../authAPI'

const initialState = {
  isLoggedIn: false,
  profile: null as null | ResponseLoginType,
  error: null as null | string,
}

const slice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setIsLoggedIn, (state, { payload }) => {
      state.isLoggedIn = payload.value
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
  },
})

export const loginReducer = slice.reducer
