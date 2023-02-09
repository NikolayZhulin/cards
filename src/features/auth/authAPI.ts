import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
  reducerPath: 'registration/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    registration: build.mutation<AddedUser | ErrorType, RequestRegisterType>({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: build.mutation<ForgotSuccessType, ForgotRequestType>({
      query: data => ({
        url: 'http://localhost:7542/2.0//auth/forgot',
        method: 'POST',
        body: {
          email: data,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
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
    me: build.mutation<UserType, {}>({
      query: body => ({
        url: 'auth/me',
        method: 'POST',
        body,
      }),
    }),
    logOut: build.mutation<any, {}>({
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
  useMeMutation,
  useSetNewPasswordMutation,
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
  publicCardPacksCount: number // количество колод

  created: string
  updated: string
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
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
