import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const newPasswordAPI = createApi({
  reducerPath: 'newPasswordAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    setNewPassword: build.mutation<ResponseType, RequestType>({
      query: body => ({
        url: 'auth/set-new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSetNewPasswordMutation } = newPasswordAPI

type RequestType = {
  password: string
  resetPasswordToken: string | undefined
}

type ResponseType = {
  info: string
  error: string
}
