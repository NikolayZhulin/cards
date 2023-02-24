import { GradesType } from '../learn-reducer'

import { multiplyGradesPush } from './multiplyGradesPush'

export const setGrades = (gradesSet: any, grades: GradesType) => {
  gradesSet.forEach((g: number) => {
    const grade = Number(g)

    if (!grades.includes(grade)) {
      multiplyGradesPush(grade, grades)
    }
  })
}
