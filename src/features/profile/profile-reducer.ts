import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
}

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeUserNameAC(state, action: PayloadAction<{ userName: string }>) {
      state.userName = action.payload.userName
    },
  },
})

export const profileReducer = slice.reducer
export const { changeUserNameAC } = slice.actions
