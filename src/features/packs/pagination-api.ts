import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paginationApi = createApi({
  reducerPath: 'paginationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0/',
    credentials: 'include',
  }),
  endpoints: build => ({
    getPacks: build.query<CardPacksType, {}>({
      query: params => ({
        url: `cards/pack`,
        method: 'GET',
        params,
      }),
    }),
    getCards: build.query<CardsType, {}>({
      query: params => ({
        url: `cards/card`,
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useLazyGetPacksQuery, useLazyGetCardsQuery } = paginationApi

//types
type CardPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover?: any
}
type CardPacksType = {
  cardPacks: CardPackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type RequestURIPackType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: '0updated' | '1updated'
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type CardsType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover?: any
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
type CardType = {
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

type RequestURICardType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: '0grade' | '1grade'
  page?: number
  pageCount?: number
}
