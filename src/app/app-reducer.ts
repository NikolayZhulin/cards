import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../common/services/helpers'
import { authAPI } from '../features/auth/authAPI'

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
  extraReducers: builder => {
    builder.addMatcher(authAPI.endpoints.registration.matchRejected, (state, { payload }) => {
      if (isFetchBaseQueryError(payload)) {
        const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

        console.log('ERRRORRRRR')
        state.error = JSON.parse(errMsg).error
      } else if (isErrorWithMessage(payload)) {
        console.warn('Unknown Error')
      }
      setTimeout(() => {
        console.log(111111111)
        state.error = null
      }, 3000)
    })
  },
})

export const appReducer = slice.reducer
export const { setAppInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
