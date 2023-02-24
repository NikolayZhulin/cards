import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const packsApi = createApi({
  reducerPath: 'packs/api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:7542/2.0/',
    baseUrl: 'https://neko-back.herokuapp.com/2.0/',
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
  }),
})

export const {
  useAddPackMutation,
  useUpdatePackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
} = packsApi

// request types
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

export type AddPackRequestType = {
  cardsPack: {
    name: string
    deckCover?: string
    private?: boolean
  }
}

export type UpdatePackRequestType = {
  cardsPack: {
    _id?: string
    name?: string
  }
}

//response types
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

export type AddPackResponseType = {
  newCardsPack: CardPack
  token: string
  tokenDeathTime: number
}

export type UpdatePackResponseType = {
  updatedCardsPack: CardPack & { deckCover?: any }
  token: string
  tokenDeathTime: number
}

export type DeletePackResponseType = {
  deletedCardsPack: CardPack & { deckCover?: any }
  token: string
  tokenDeathTime: number
}
