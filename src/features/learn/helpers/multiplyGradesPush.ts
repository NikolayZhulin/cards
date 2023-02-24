export const multiplyGradesPush = (grade: number, grades: any) => {
  let qty

  if (grade === 0) {
    qty = 20
  } else {
    qty = Math.round(20 / grade)
  }

  for (let i = 0; i < qty; i++) {
    grades.push(grade)
  }
}
