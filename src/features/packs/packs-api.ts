import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const packsAPI = createApi({
  reducerPath: 'packsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    getPacks: build.query<{}, {}>({
      query: body => ({
        url: 'cards/pack',
        method: 'GET',
        body,
      }),
    }),
  }),
})

export const {} = packsAPI
