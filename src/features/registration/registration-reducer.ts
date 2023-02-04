import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  registered: false,
}

const slice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    addRegistrationAC(state, action: PayloadAction<{ registered: boolean }>) {
      state.registered = action.payload.registered
    },
  },
})

export const registrationReducer = slice.reducer
export const { addRegistrationAC } = slice.actions
