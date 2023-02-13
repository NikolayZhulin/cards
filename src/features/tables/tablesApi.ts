import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tablesApi = createApi({
  reducerPath: 'tables/api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:7542/2.0/',
    baseUrl: 'https://neko-back.herokuapp.com/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    fetchCardsPack: build.query<FetchCardsPacksResponseType, FetchCardsPacksRequestType>({
      query: ({ packName, min, max, sortPacks, page, pageCount, user_id, block }) => ({
        url: 'cards/pack',
        method: 'GET',
        params: {
          packName,
          min,
          max,
          sortPacks,
          page,
          pageCount,
          user_id,
          block,
        },
      }),
    }),
    fetchCards: build.query<FetchCardsResponseType, FetchCardsRequestType>({
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
  }),
})

export const { useFetchCardsPackQuery, useFetchCardsQuery } = tablesApi

export type FetchCardsPacksRequestType = {
  packName: string
  min: number
  max: number
  sortPacks: number
  page: number
  pageCount: number
  user_id: string
  block: boolean
}

export type FetchCardsRequestType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: string
  page: number
  pageCount: number
}

export type FetchCardsPacksResponseType = {
  cardPacks: CardPack[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CardPack = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  cardsCount: number
  created: string
  updated: string
  __v: number
  path: string
  grade: number
  shots: number
  type: string
  rating: number
  more_id: string
}

export type FetchCardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: any
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
