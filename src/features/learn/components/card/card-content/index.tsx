import React, { memo } from 'react'

import { Question, Shots } from '../../../styles'

type Props = {
  question: string
  shots: number
}

export const CardContent = memo(({ question, shots }: Props) => {
  return (
    <>
      <Question>
        <strong>Question:</strong> {question}
      </Question>
      <Shots>
        Количество попыток ответов на вопрос: <strong>{shots}</strong>
      </Shots>
    </>
  )
})
