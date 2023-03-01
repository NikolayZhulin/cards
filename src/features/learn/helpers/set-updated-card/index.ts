import { UpdateGradeResponseType } from '../../api'
import { State } from '../../models'
import { multiplyGradesPush } from '../multiply-grades-push'

export const setUpdatedCard = (state: State, { updatedGrade }: UpdateGradeResponseType) => {
  const { grade, card_id, cardsPack_id, user_id, shots } = updatedGrade
  const { handledCards, ids, grades, randomCard } = state
  const { answer, question, created, updated, questionImg, answerImg } = randomCard

  handledCards[grade] = {
    ...handledCards[grade],
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
      questionImg,
      answerImg,
    },
  }
  if (!ids[grade]) {
    ids[grade] = []
  }

  ids[grade].push(card_id)

  if (!grades.includes(grade)) {
    multiplyGradesPush(grade, grades)
  }
}
