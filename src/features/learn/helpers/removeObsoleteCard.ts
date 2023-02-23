import { State } from '../learn-reducer-copy'

export const removeObsoleteCard = (state: State) => {
  const { handledCards, ids, grades, randomCard } = state
  const { grade, _id } = randomCard

  delete handledCards[grade][_id]
  ids[grade].splice(
    ids[grade].findIndex(id => id === _id),
    1
  )

  if (JSON.stringify(handledCards[grade]) === '{}' && JSON.stringify(ids[grade]) === '[]') {
    delete handledCards[grade]
    delete ids[grade]
    state.grades = grades.filter(g => g !== grade)
  }
  if (JSON.stringify(handledCards[grade]) === '{}' && JSON.stringify(ids[grade]) !== '[]') {
    throw new Error('removePrevPlaceError')
  }
  if (JSON.stringify(handledCards[grade]) !== '{}' && JSON.stringify(ids[grade]) === '[]') {
    throw new Error('removePrevPlaceError')
  }
}
