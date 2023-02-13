import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { letter } from '../../common/utils'

export const authAPI = createApi({
  reducerPath: 'registration/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  tagTypes: ['me'],
  endpoints: build => ({
    registration: build.mutation<AddedUser, RequestRegisterType>({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: build.mutation<ForgotSuccessType, ForgotRequestType>({
      query: data => ({
        url: '/auth/forgot',
        method: 'POST',
        body: {
          email: data,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: letter,
        },
      }),
    }),
    login: build.mutation<ResponseLoginType, RequestLoginType>({
      query: formData => ({
        url: 'auth/login',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
    me: build.query<UserType, void>({
      query: body => ({
        url: 'auth/me',
        method: 'POST',
        body,
      }),
      providesTags: ['me'],
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
      invalidatesTags: ['me'],
    }),
    logOut: build.mutation<void, {}>({
      query: body => ({
        url: 'auth/me',
        method: 'DELETE',
        body,
      }),
    }),
    setNewPassword: build.mutation<ResponseNewPasswordType, RequestNewPasswordType>({
      query: body => ({
        url: 'auth/set-new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegistrationMutation,
  useForgotPasswordMutation,
  useLogOutMutation,
  useMeQuery,
  useSetNewPasswordMutation,
  useChangeUserMutation,
} = authAPI

export type ForgotSuccessType = {
  info: string
  success: boolean
  answer: boolean
  html: any
}
export type ForgotRequestType = {
  email: string
  from: string
  message: Element
}
type RequestRegisterType = {
  email: string
  password: string
}
export interface AddedUser {
  addedUser: {
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
}
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
export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  __v: number
  token: string
  tokenDeathTime: number | null
}
type RequestNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}
type ResponseNewPasswordType = {
  info: string
  error: string
}
