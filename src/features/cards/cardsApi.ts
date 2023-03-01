import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardsApi = createApi({
  reducerPath: 'cards/api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:7542/2.0/',
    baseUrl: 'https://neko-back.herokuapp.com/2.0/',
    credentials: 'include',
  }),
  tagTypes: ['getCards', 'getCard'],
  endpoints: build => ({
    fetchCards: build.query<FetchCardsResponseType, FetchCardsRequestType>({
      query: params => ({
        url: 'cards/card',
        method: 'GET',
        params,
      }),
      providesTags: ['getCard'],
    }),
    addCard: build.mutation<AddCardResponseType, AddCardRequestType>({
      query: body => ({
        url: '/cards/card',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getCard'],
    }),
    updateCard: build.mutation<UpdateCardResponseType, UpdateCardRequestType>({
      query: body => ({
        url: '/cards/card',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['getCard'],
    }),
    deleteCard: build.mutation<DeleteCardResponseType, string>({
      query: id => ({
        url: `/cards/card?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCard'],
    }),
  }),
})

export const {
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useLazyFetchCardsQuery,
  useFetchCardsQuery,
} = cardsApi

// request types
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

export type AddCardRequestType = {
  card: {
    cardsPack_id?: string
    question?: string
    answer?: string
    grade?: 0 | 1 | 2 | 3 | 4 | 5
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}
export type UpdateCardRequestType = {
  card: {
    _id: string
    question?: string
    questionImg?: string
    answer?: string
    answerImg?: string
  }
}

//response types
export type CardPack = {
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
  __v: number
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

export type NewCard = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  comments?: string
  type?: string
  rating?: number
  more_id?: string
  __v?: number
}
export type CardType = NewCard & {
  answerImg?: string
  answerVideo?: string
  questionImg?: string
  questionVideo?: string
}

export type AddCardResponseType = {
  newCard: NewCard
  token: string
  tokenDeathTime: number
}
export type DeleteCardResponseType = {
  deletedCard: NewCard
  token: string
  tokenDeathTime: number
}
export type UpdateCardResponseType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}
