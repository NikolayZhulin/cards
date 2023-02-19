import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../tables'

import { CardObjType, GradedCardsIds, GradesType, HandledPackType } from './learn'
import { learnApi } from './learnApi'
import { multiplyGradesPush } from './utils/multiplyGradesPush'

const initialState: {
  handledCards: HandledPackType
  ids: GradedCardsIds
  grades: GradesType
  randomCard: CardType
} = {
  handledCards: {
    '0': {} as CardObjType,
    '1': {} as CardObjType,
    '2': {} as CardObjType,
    '3': {} as CardObjType,
    '4': {} as CardObjType,
    '5': {} as CardObjType,
  },
  ids: {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
  },
  grades: [],
  randomCard: {} as CardType,
}

const slice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    removePrevCard: (state, action: PayloadAction<CardType>) => {
      const { grade, _id } = action.payload

      delete state.handledCards[grade][_id]
    },
    setRandomCard: (state, action) => {
      state.randomCard = action.payload
    },
  },
  extraReducers: builder => {
    builder.addMatcher(learnApi.endpoints.fetchAllCards.matchFulfilled, (state, { payload }) => {
      const { cards } = payload
      let gradesSet = new Set()

      cards.forEach(c => {
        state.handledCards[c.grade] = { ...state.handledCards[c.grade], [c._id]: c }
        state.ids[c.grade].push(c._id)
        gradesSet.add(c.grade)
      })

      gradesSet.forEach(g => {
        switch (g) {
          case 0:
            multiplyGradesPush(g, 5, state)
            break
          case 1:
            multiplyGradesPush(g, 5, state)
            break
          case 2:
            multiplyGradesPush(g, 4, state)
            break
          case 3:
            multiplyGradesPush(g, 3, state)
            break
          case 4:
            multiplyGradesPush(g, 2, state)
            break
          case 5:
            multiplyGradesPush(g, 1, state)
        }
      })
    })
    builder.addMatcher(learnApi.endpoints.updateGrade.matchFulfilled, (state, { payload }) => {
      const { updatedGrade } = payload
      const { grade, _id, card_id, cardsPack_id, user_id, shots } = updatedGrade
      const { answer, question, created, updated } = state.randomCard

      console.log(updatedGrade)

      state.handledCards[grade] = {
        ...state.handledCards[grade],
        [card_id]: {
          _id: card_id,
          grade,
          cardsPack_id,
          user_id,
          shots: shots,
          answer,
          question,
          created,
          updated,
        },
      }
    })
  },
})

export const learnReducer = slice.reducer
export const { removePrevCard, setRandomCard } = slice.actions
