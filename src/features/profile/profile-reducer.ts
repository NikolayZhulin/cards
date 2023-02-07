import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch } from '../../common/hooks/hooks'

import { UserType } from './profile-api'

const initialState: {
  user: UserType
} = {
  user: {
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
  },
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeUserAC(state, action: PayloadAction<{ name?: string; avatar?: string }>) {
      if (action.payload.name) state.user.name = action.payload.name
      if (action.payload.avatar) state.user.avatar = action.payload.avatar
    },
    setUserProfileAC(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const profileReducer = slice.reducer
export const { changeUserAC, setUserProfileAC } = slice.actions

// thunks
// export const fetchUserProfileTC = () => async (dispatch: AppDispatch) => {
//   try {
//   } catch (e) {}
// }
