import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: true,
}

const slice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const loginReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
