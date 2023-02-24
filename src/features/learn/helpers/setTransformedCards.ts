import { CardType } from '../../cards'
import { State } from '../learn-reducer'

import { setGrades } from './setGrades'
import { setIdValues } from './setIdValues'
import { setSortedCards } from './setSortedCards'

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
