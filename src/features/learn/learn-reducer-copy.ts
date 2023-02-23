import { createSlice } from '@reduxjs/toolkit'

import { CardType, NewCard } from '../tables'

import { setRandomCard } from './helpers/setRandomCard'
import { setTransformedCards } from './helpers/setTransformedCards'
import { setUpdatedCard } from './helpers/setUpdatedCard'
import { learnApi } from './learnApi'

const initialState: {
  packName: string
  handledCards: HandledPackType
  ids: GradedCardsIds
  grades: GradesType
  randomCard: CardType
} = {
  packName: '',
  handledCards: {},
  ids: {},
  grades: [],
  randomCard: {} as CardType,
}

const slice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    removePrevPlaceCard: state => {
      const { grade, _id } = state.randomCard

      delete state.handledCards[grade][_id]
      state.ids[grade].splice(
        state.ids[grade].findIndex(id => id === _id),
        1
      )

      if (
        JSON.stringify(state.handledCards[grade]) === '{}' &&
        JSON.stringify(state.ids[grade]) === '[]'
      ) {
        delete state.handledCards[grade]
        delete state.ids[grade]
        state.grades = state.grades.filter(g => g !== grade)
      }
      if (
        JSON.stringify(state.handledCards[grade]) === '{}' &&
        JSON.stringify(state.ids[grade]) !== '[]'
      ) {
        throw new Error('removePrevPlaceError')
      }
      if (
        JSON.stringify(state.handledCards[grade]) !== '{}' &&
        JSON.stringify(state.ids[grade]) === '[]'
      ) {
        throw new Error('removePrevPlaceError')
      }
    },
    chooseRandomCard: state => {
      const changedCard = setRandomCard(state.handledCards, state.ids, state.grades)

      if (changedCard) {
        state.randomCard = changedCard
      }
    },
    clearAllState: state => {
      state.packName = ''
      state.handledCards = {}
      state.ids = {}
      state.grades = []
      state.randomCard = {} as CardType
    },
  },
  extraReducers: builder => {
    builder.addMatcher(learnApi.endpoints.fetchAllCards.matchFulfilled, (state, { payload }) => {
      const { cards, packName } = payload
      const { handledCards, ids, grades } = state

      state.packName = packName

      setTransformedCards(cards, handledCards, ids, grades)
    })
    builder.addMatcher(learnApi.endpoints.updateGrade.matchFulfilled, (state, { payload }) => {
      setUpdatedCard(state.handledCards, state.ids, state.grades, payload, state.randomCard)
    })
  },
})

export const learnReducer = slice.reducer
export const { removePrevPlaceCard, chooseRandomCard, clearAllState } = slice.actions

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: NewCard }
