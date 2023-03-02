import React from 'react'

import { Question, Shots } from '../../../styles'

type Props = {
  question: string
  shots: number
  questionImg?: string
}

export const CardContent = ({ question, shots, questionImg }: Props) => {
  return (
    <>
      <Question>
        <strong>Question:</strong> {question === 'no question' ? '' : question}
      </Question>
      {questionImg && (
        <img
          src={questionImg}
          alt="question"
          style={{ margin: '0 auto', display: 'block', width: '100%' }}
        />
      )}
      <Shots>
        Количество попыток ответов на вопрос: <strong>{shots}</strong>
      </Shots>
    </>
  )
}
