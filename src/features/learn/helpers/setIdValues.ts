import { GradedCardsIds } from '../learn-reducer'

export const setIdValues = (idValues: GradedCardsIds, grade: number, id: string) => {
  // eslint-disable-next-line no-prototype-builtins
  if (idValues.hasOwnProperty(grade)) {
    if (!idValues[grade].includes(id)) {
      idValues[grade].push(id)
    }
  } else {
    idValues[grade] = [id]
  }
}
