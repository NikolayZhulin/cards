import { GradesType } from '../../../models'
import { multiplyGradesPush } from '../../multiply-grades-push'

export const setGrades = (gradesSet: any, grades: GradesType) => {
  gradesSet.forEach((g: number) => {
    const grade = Number(g)

    if (!grades.includes(grade)) {
      multiplyGradesPush(grade, grades)
    }
  })
}
