import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

import { FetchCardsRequestType, FetchCardsResponseType } from '../tables'

export const learnApi = createApi({
  reducerPath: 'learn/api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:7542/2.0/',
    baseUrl: 'https://neko-back.herokuapp.com/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    fetchAllCards: build.query<FetchCardsResponseType, FetchCardsRequestType>({
      query: ({
        cardAnswer,
        cardQuestion,
        cardsPack_id,
        min,
        max,
        sortCards,
        page,
        pageCount,
      }) => ({
        url: 'cards/card',
        method: 'GET',
        params: {
          cardAnswer,
          cardQuestion,
          cardsPack_id,
          min,
          max,
          sortCards,
          page,
          pageCount,
        },
      }),
    }),
    updateGrade: build.mutation<UpdateGradeResponseType, UpdateGradeRequestType>({
      query: ({ grade, card_id }) => ({
        url: 'cards/grade',
        method: 'POST',
        body: {
          grade,
          card_id,
        },
      }),
    }),
  }),
})

export const { useFetchAllCardsQuery, useLazyFetchAllCardsQuery, useUpdateGradeMutation } = learnApi

export type UpdateGradeRequestType = {
  grade: 1 | 2 | 3 | 4 | 5
  card_id: string
}

export type UpdateGradeResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: 1 | 2 | 3 | 4 | 5
    shots: number
  }
}
