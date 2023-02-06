import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch } from '../../common/hooks/hooks'

import { UserType } from './profile-api'

const initialState: {
  user: UserType
  isLoading: boolean
  error: string | null
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
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeUserAC(state, action: PayloadAction<{ name: string; avatar?: string }>) {
      state.user.name = action.payload.name
      state.user.avatar = action.payload.avatar
    },
    getUserProfileAC(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const profileReducer = slice.reducer
export const { changeUserAC, getUserProfileAC } = slice.actions

// thunks
// export const fetchUserProfileTC = () => async (dispatch: AppDispatch) => {
//   try {
//   } catch (e) {}
// }
