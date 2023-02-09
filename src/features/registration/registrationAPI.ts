import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registrationAPI = createApi({
  reducerPath: 'registration/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0/',
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
  }),
})

export const { useRegistrationMutation, useForgotPasswordMutation } = registrationAPI

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
