import { createSlice, current } from '@reduxjs/toolkit'

import { CardType, NewCard } from '../tables'

import { multiplyGradesPush } from './helpers/multiplyGradesPush'
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
  reducers: {},
})

export const learnReducer = slice.reducer
export const {} = slice.actions

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: NewCard }
