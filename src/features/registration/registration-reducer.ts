import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isErrorWithMessage, isFetchBaseQueryError } from '../../common/services/helpers'

import { registrationAPI } from './registrationAPI'

const initialState = {
  registered: false,
  error: null as null | string,
}

const slice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    addRegistrationAC(state, action: PayloadAction<{ registered: boolean }>) {
      state.registered = action.payload.registered
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      registrationAPI.endpoints.registration.matchFulfilled,
      (state, { payload }) => {
        state.registered = true
      }
    )
    builder.addMatcher(
      registrationAPI.endpoints.registration.matchRejected,
      (state, { payload }) => {
        if (isFetchBaseQueryError(payload)) {
          const errMsg = 'error' in payload ? payload.error : JSON.stringify(payload.data)

          state.error = JSON.parse(errMsg).error
        } else if (isErrorWithMessage(payload)) {
          console.warn('Unknown Error')
        }
      }
    )
  },
})

export const registrationReducer = slice.reducer
