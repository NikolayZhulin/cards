import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type RequestLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ResponseLoginType = {
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
  token: string
  tokenDeathTime: number
  avatar: string
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    credentials: 'include',
  }),
  endpoints: builder => ({
    login: builder.mutation<ResponseLoginType, RequestLoginType>({
      query: formData => ({
        url: 'auth/login',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
  }),
})

export const { useLoginMutation } = loginApi
