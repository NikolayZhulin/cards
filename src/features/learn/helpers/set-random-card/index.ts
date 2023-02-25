import { GradedCardsIds, GradesType, HandledPackType } from '../../models'

export const setRandomCard = (
  cards: HandledPackType,
  idValues: GradedCardsIds,
  grades: GradesType
) => {
  if (JSON.stringify(cards) !== '{}' && JSON.stringify(idValues) !== '{}' && grades.length) {
    const randomGradeIdx = grades[Math.floor(Math.random() * grades.length)]
    const gradedCards = cards[randomGradeIdx]
    const gradedIds = idValues[randomGradeIdx]

    const randomCardId = gradedIds[Math.floor(Math.random() * gradedIds.length)]

    return gradedCards[randomCardId]
  }
}
