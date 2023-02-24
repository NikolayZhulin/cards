import { createSlice } from '@reduxjs/toolkit'

import { CardType, NewCard } from '../cards'

import { clearState } from './helpers/clearState'
import { removeObsoleteCard } from './helpers/removeObsoleteCard'
import { setRandomCard } from './helpers/setRandomCard'
import { setTransformedCards } from './helpers/setTransformedCards'
import { setUpdatedCard } from './helpers/setUpdatedCard'
import { learnApi } from './learnApi'

const slice = createSlice({
  name: 'learn',
  initialState: {
    packName: '',
    handledCards: {} as HandledPackType,
    ids: {} as GradedCardsIds,
    grades: [] as GradesType,
    randomCard: {} as CardType,
  },
  reducers: {
    removePrevPlaceCard: state => {
      removeObsoleteCard(state)
    },
    chooseRandomCard: state => {
      const changedCard = setRandomCard(state.handledCards, state.ids, state.grades)

      if (changedCard) {
        state.randomCard = changedCard
      }
    },
    clearAllState: state => {
      clearState(state)
    },
  },
  extraReducers: builder => {
    builder.addMatcher(learnApi.endpoints.fetchAllCards.matchFulfilled, (state, { payload }) => {
      const { cards, packName } = payload

      state.packName = packName

      setTransformedCards(cards, state)
    })
    builder.addMatcher(learnApi.endpoints.updateGrade.matchFulfilled, (state, { payload }) => {
      setUpdatedCard(state, payload)
    })
  },
})

export const learnReducer = slice.reducer
export const { removePrevPlaceCard, chooseRandomCard, clearAllState } = slice.actions

export type State = ReturnType<typeof slice.getInitialState>

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: NewCard }
