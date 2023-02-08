import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registrationAPI = createApi({
  reducerPath: 'registration/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0',
  }),
  endpoints: build => ({
    registration: build.mutation<AddedUser | ErrorType, RequestRegisterType>({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useRegistrationMutation } = registrationAPI

export type ErrorType = {
  status: number
  data: {
    error: string
    email: string
    in: string
  }
}

type RequestRegisterType = {
  email: string
  password: string
}

export interface AddedUser {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  __v: number
}
