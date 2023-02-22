import { multiplyGradesPush } from './multiplyGradesPush'

export const sortCardsByGrade = ({ cards, packName }: any) => {
  const handledCards: any = {}
  const sortedId: any = {}
  const grades: number[] = []

  let gradesSet = new Set()

  cards.forEach((c: any) => {
    handledCards[c.grade] = { ...handledCards[c.grade], [c._id]: c }
    gradesSet.add(c.grade)

    // eslint-disable-next-line no-prototype-builtins
    if (sortedId.hasOwnProperty(c.grade)) {
      if (!sortedId[c.grade].includes(c._id)) {
        sortedId[c.grade].push(c._id)
      }
    } else {
      sortedId[c.grade] = [c._id]
    }
  })

  gradesSet.forEach(g => {
    const grade = Number(g)

    if (!grades.includes(grade)) {
      multiplyGradesPush(grade, grades)
    }
  })

  return { packName }
}
