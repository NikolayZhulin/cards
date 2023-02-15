export const setLeadingZero = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export const formatDate = (str: string) => {
  let date = new Date(str)

  return `${setLeadingZero(date.getUTCDate())}.${setLeadingZero(
    date.getUTCMonth() + 1
  )}.${setLeadingZero(date.getUTCFullYear())}`
}
