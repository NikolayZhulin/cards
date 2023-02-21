export const multiplyGradesPush = (grade: number, state: any) => {
  let qty

  if (grade === 0) {
    qty = 20
  } else {
    qty = Math.round(20 / grade)
  }

  for (let i = 0; i < qty; i++) {
    state.grades.push(grade)
  }
}
