import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ResponseLoginType } from './loginApi'

const initialState = {
  isLoggedIn: false,
  profile: null as null | ResponseLoginType,
}

const slice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setProfileData(state, action: PayloadAction<{ profile: ResponseLoginType }>) {
      state.profile = action.payload.profile
    },
  },
})

export const loginReducer = slice.reducer
export const { setIsLoggedInAC, setProfileData } = slice.actions
