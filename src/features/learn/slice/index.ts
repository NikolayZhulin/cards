import { createSlice } from '@reduxjs/toolkit'

import { CardType } from '../../cards'
import { learnApi } from '../api'
import {
  clearState,
  removeObsoleteCard,
  setRandomCard,
  setTransformedCards,
  setUpdatedCard,
} from '../helpers'
import { GradedCardsIds, GradesType, HandledPackType } from '../models'

export const slice = createSlice({
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
