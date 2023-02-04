import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppInitializedAC: (state, action: PayloadAction<{ status: boolean }>) => {
      state.isInitialized = action.payload.status
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const { setAppInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
