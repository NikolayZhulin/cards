import { CardType } from '../../tables'
import { GradedCardsIds, GradesType, HandledPackType } from '../learn-reducer-copy'
import { UpdateGradeResponseType } from '../learnApi'

import { multiplyGradesPush } from './multiplyGradesPush'

export const setUpdatedCard = (
  cards: HandledPackType,
  idValues: GradedCardsIds,
  grades: GradesType,
  { updatedGrade }: UpdateGradeResponseType,
  randomCard: CardType
) => {
  const { grade, card_id, cardsPack_id, user_id, shots } = updatedGrade
  const { answer, question, created, updated } = randomCard

  cards[grade] = {
    ...cards[grade],
    [card_id]: {
      _id: card_id,
      grade,
      cardsPack_id,
      user_id,
      shots,
      answer,
      question,
      created,
      updated,
    },
  }
  if (!idValues[grade]) {
    idValues[grade] = []
  }

  idValues[grade].push(card_id)

  if (!grades.includes(grade)) {
    multiplyGradesPush(grade, grades)
  }
}
