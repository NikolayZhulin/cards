import { NewCard } from '../../cards'
import { slice } from '../slice'

export type State = ReturnType<typeof slice.getInitialState>

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: NewCard }
