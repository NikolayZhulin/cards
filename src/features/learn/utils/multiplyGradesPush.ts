export const multiplyGradesPush = (value: number, pushQty: number, state: any) => {
  for (let i = 0; i < pushQty; i++) {
    state.grades.push(value)
  }
}
