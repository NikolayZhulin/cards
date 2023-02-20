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
      query: params => ({
        url: 'cards/pack',
        method: 'GET',
        params,
      }),
      providesTags: ['getCards'],
    }),
    addPack: build.mutation<AddPackResponseType, AddPackRequestType>({
      query: body => ({
        url: '/cards/pack',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getCards'],
    }),
    updatePack: build.mutation<UpdatePackResponseType, UpdatePackRequestType>({
      query: body => ({
        url: '/cards/pack',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['getCards', 'getCard'],
    }),
    deletePack: build.mutation<DeletePackResponseType, string>({
      query: packId => ({
        url: `/cards/pack?id=${packId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCards'],
    }),
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
  useAddPackMutation,
  useUpdatePackMutation,
  useDeletePackMutation,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useLazyFetchCardsPackQuery,
  useLazyFetchCardsQuery,
} = tablesApi

// request types
type FetchCardsPacksRequestType = {
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

type FetchCardsRequestType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

type AddPackRequestType = {
  cardsPack: {
    name: string
    deckCover?: string
    private?: boolean
  }
}

type UpdatePackRequestType = {
  cardsPack: {
    _id?: string
    name?: string
  }
}

type AddCardRequestType = {
  card: {
    cardsPack_id: string
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
type UpdateCardRequestType = {
  card: {
    _id: string
    question?: string
    questionImg?: string
    answer?: string
    answerImg?: string
  }
}

//response types
type FetchCardsPacksResponseType = {
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
type CardPack = {
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

type AddPackResponseType = {
  newCardsPack: CardPack
  token: string
  tokenDeathTime: number
}

type UpdatePackResponseType = {
  updatedCardsPack: CardPack & { deckCover?: any }
  token: string
  tokenDeathTime: number
}

type DeletePackResponseType = {
  deletedCardsPack: CardPack & { deckCover?: any }
  token: string
  tokenDeathTime: number
}

type FetchCardsResponseType = {
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

type NewCard = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  comments: string
  type: string
  rating: number
  more_id: string
  __v: number
}
type CardType = NewCard & {
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

type AddCardResponseType = {
  newCard: NewCard
  token: string
  tokenDeathTime: number
}
type DeleteCardResponseType = {
  deletedCard: NewCard
  token: string
  tokenDeathTime: number
}
type UpdateCardResponseType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}
