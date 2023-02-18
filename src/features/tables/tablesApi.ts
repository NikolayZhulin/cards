import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tablesApi = createApi({
  reducerPath: 'tables/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7542/2.0/',
    // baseUrl: 'https://neko-back.herokuapp.com/2.0/',
    credentials: 'include',
  }),
  tagTypes: ['getCards', 'getCard'],
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
      providesTags: ['getCards'],
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
      providesTags: ['getCard'],
    }),
    addPack: build.mutation<any, AddPackRequestType>({
      query: body => ({
        url: '/cards/pack',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getCards'],
    }),
    updatePack: build.mutation<any, any>({
      query: data => ({
        url: '/cards/pack',
        method: 'PUT',
        body: {
          cardsPack: {
            _id: data,
            name: 'NEW_NAME',
          },
        },
      }),
      invalidatesTags: ['getCards'],
    }),
    deletePack: build.mutation<any, any>({
      query: data => ({
        url: `/cards/pack?id=${data}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCards'],
    }),
    addCard: build.mutation<any, any>({
      query: data => ({
        url: '/cards/card',
        method: 'POST',
        body: {
          card: {
            cardsPack_id: data,
            question: 'NEW QUESTION5555555',
            answer: 'NEW ANSWER5555555',
          },
        },
      }),
      invalidatesTags: ['getCard'],
    }),
    updateCard: build.mutation<any, any>({
      query: data => ({
        url: '/cards/card',
        method: 'PUT',
        body: {
          card: {
            _id: data,
            question: 'NE',
          },
        },
      }),
      invalidatesTags: ['getCard'],
    }),
    deleteCard: build.mutation<any, any>({
      query: data => ({
        url: `/cards/card?id=${data}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCard'],
    }),
  }),
})

export const {
  useFetchCardsPackQuery,
  useFetchCardsQuery,
  useAddPackMutation,
  useUpdatePackMutation,
  useDeletePackMutation,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useLazyFetchCardsPackQuery,
  useLazyFetchCardsQuery,
} = tablesApi

export type FetchCardsPacksRequestType = {
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type FetchCardsRequestType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
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
  user_id: string
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

type AddPackRequestType = {
  cardsPack: {
    name: string
    deckCover?: string
    private?: boolean
  }
}
