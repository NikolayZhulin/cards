import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../tables'

import { learnApi } from './learnApi'
import { multiplyGradesPush } from './utils/multiplyGradesPush'

const initialState: {
  handledCards: HandledPackType
  ids: GradedCardsIds
  grades: GradesType
  randomCard: CardType
} = {
  handledCards: {},
  ids: {},
  grades: [],
  randomCard: {} as CardType,
}

const slice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    removePrevPlaceCard: (state, action: PayloadAction<CardType>) => {
      const { grade, _id } = action.payload

      if (state.ids[grade].length > 1) {
        delete state.handledCards[grade][_id]
        state.ids[grade].splice(
          state.ids[grade].findIndex(id => id === _id),
          1
        )
      } else {
        delete state.handledCards[grade]
        delete state.ids[grade]
        state.grades = state.grades.filter(g => g !== grade)
      }
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
        gradesSet.add(c.grade)

        // eslint-disable-next-line no-prototype-builtins
        if (state.ids.hasOwnProperty(c.grade)) {
          state.ids[c.grade].push(c._id)
        } else {
          state.ids[c.grade] = [c._id]
        }
      })

      gradesSet.forEach(g => {
        const grade = Number(g)
        const qty = Math.round(20 / grade)

        multiplyGradesPush(grade, qty, state)
      })
    })
    builder.addMatcher(learnApi.endpoints.updateGrade.matchFulfilled, (state, { payload }) => {
      const { updatedGrade } = payload
      const { grade, card_id, cardsPack_id, user_id, shots } = updatedGrade
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

      state.ids[grade] = [...state.ids[grade], card_id]

      const qty = Math.round(20 / grade)

      multiplyGradesPush(grade, qty, state)
    })
  },
})

export const learnReducer = slice.reducer
export const { removePrevPlaceCard, setRandomCard } = slice.actions

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: CardType }
