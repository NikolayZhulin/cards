import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from './profile-api'

const initialState: UserType = {
  _id: '',
  email: 'email',
  name: 'name',
  avatar: 'avatar',
  publicCardPacksCount: 0, // количество колод

  created: '',
  updated: '',
  isAdmin: false,
  verified: true, // подтвердил ли почту
  rememberMe: true,
  error: '',
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeUserAC(state, action: PayloadAction<{ name: string; avatar?: string }>) {
      state.name = action.payload.name
      state.avatar = action.payload.avatar
    },
    getUserProfileAC(state, action: PayloadAction<UserType>) {
      return action.payload
    },
  },
})

export const profileReducer = slice.reducer
export const { changeUserAC, getUserProfileAC } = slice.actions

// thunks
