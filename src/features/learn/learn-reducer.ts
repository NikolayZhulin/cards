import { createSlice } from '@reduxjs/toolkit'

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
    setRandomCard: state => {
      if (
        JSON.stringify(state.handledCards) !== '{}' &&
        JSON.stringify(state.ids) !== '{}' &&
        state.grades.length
      ) {
        const randomGradeIdx = state.grades[Math.floor(Math.random() * state.grades.length)]
        const gradedCards = state.handledCards[randomGradeIdx]
        const gradedIds = state.ids[randomGradeIdx]

        const randomCardId = gradedIds[Math.floor(Math.random() * gradedIds.length)]

        state.randomCard = gradedCards[randomCardId]
      }
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
          if (!state.ids[c.grade].includes(c._id)) {
            state.ids[c.grade].push(c._id)
          }
        } else {
          state.ids[c.grade] = [c._id]
        }
      })

      gradesSet.forEach(g => {
        const grade = Number(g)

        if (!state.grades.includes(grade)) {
          multiplyGradesPush(grade, state)
        }
      })
    })
    builder.addMatcher(learnApi.endpoints.updateGrade.matchFulfilled, (state, { payload }) => {
      const { grade, card_id, cardsPack_id, user_id, shots } = payload.updatedGrade
      const { answer, question, created, updated } = state.randomCard

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
      if (!state.ids[grade]) {
        state.ids[grade] = []
      }

      state.ids[grade].push(card_id)

      if (!state.grades.includes(grade)) {
        multiplyGradesPush(grade, state)
      }
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
