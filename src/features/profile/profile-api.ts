import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//
// export const profileAPI = createApi({
//   reducerPath: 'profileAPI',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
//     credentials: 'include',
//   }),
//   endpoints: build => ({}),
// })
//
// export const { useChangeUserMutation } = profileAPI
//
// export type UserType = {
//   _id: string
//   email: string
//   name: string
//   avatar?: string
//   publicCardPacksCount: number // количество колод
//
//   created: string
//   updated: string
//   isAdmin: boolean
//   verified: boolean // подтвердил ли почту
//   rememberMe: boolean
//
//   __v: number
//   token: string
//   tokenDeathTime: number | null
// }
