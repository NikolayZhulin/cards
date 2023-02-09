import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../../common/services/helpers'
import { setIsLoggedIn } from '../profile'
import { profileAPI } from '../profile/profile-api'

import { loginApi, ResponseLoginType } from './loginApi'

const initialState = {
  isLoggedIn: false,
  profile: null as null | ResponseLoginType,
  error: null as null | string,
}

const slice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    // setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
    //   state.isLoggedIn = action.payload.value
    // },
    // setProfileData(state, action: PayloadAction<{ profile: ResponseLoginType }>) {
    //   state.profile = action.payload.profile
    // },
  },
  extraReducers: builder => {
    builder.addCase(setIsLoggedIn, (state, { payload }) => {
      state.isLoggedIn = payload.value
    })
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.isLoggedIn = true
    })
    builder.addMatcher(loginApi.endpoints.login.matchRejected, (state, { payload }) => {
      if (isFetchBaseQueryError(payload)) {
        const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

        state.error = JSON.parse(errMsg).error
      } else if (isErrorWithMessage(payload)) {
        console.warn('Unknown Error')
      }
    })
    builder.addMatcher(profileAPI.endpoints.logOut.matchFulfilled, state => {
      state.isLoggedIn = false
    })
  },
})

export const loginReducer = slice.reducer
// export const { setIsLoggedInAC, setProfileData } = slice.actions
