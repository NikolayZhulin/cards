import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    getUserProfile: build.mutation<UserType, {}>({
      query: body => ({
        url: 'auth/me',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<any, any>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    changeUser: build.mutation<
      { updatedUser: UserType; error?: string },
      { name?: string; avatar?: string }
    >({
      query: body => ({
        url: 'auth/me',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const { useGetUserProfileMutation, useLoginMutation, useChangeUserMutation } = profileAPI

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
