import { useState } from 'react'

export const useToggleGradeSection = () => {
  const [isHidden, setIsHidden] = useState(true)

  const showAnswer = () => {
    setIsHidden(false)
  }

  const hideAnswer = () => {
    setIsHidden(true)
  }

  return { isHidden, showAnswer, hideAnswer }
}
