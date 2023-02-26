import { NewCard } from '../../../../cards'
import { HandledPackType } from '../../../models'

export const setSortedCards = (cards: HandledPackType, card: NewCard) => {
  const { grade, _id } = card

  cards[grade] = { ...cards[grade], [_id]: card }
}
