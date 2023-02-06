import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  }),
  endpoints: build => ({
    getUserProfile: build.mutation<UserType, {}>({
      query: arg => ({
        url: 'auth/me',
        method: 'POST',
        arg,
      }),
    }),
  }),
})

export const { useGetUserProfileMutation } = profileAPI

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод

  created: string
  updated: string
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}
