import { CardType } from '../../../cards'
import { State } from '../../models'

import { setGrades } from './set-grades'
import { setIdValues } from './set-id-values'
import { setSortedCards } from './set-sorted-cards'

export const setTransformedCards = (cards: CardType[], state: State) => {
  const { handledCards, ids, grades } = state

  let gradesSet = new Set()

  cards.forEach(c => {
    setSortedCards(handledCards, c)
    gradesSet.add(c.grade)
    setIdValues(ids, c.grade, c._id)
  })

  setGrades(gradesSet, grades)
}
