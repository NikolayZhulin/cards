import React, { memo } from 'react'

type Props = {
  question: string
  shots: number
}

export const CardContent = memo(({ question, shots }: Props) => {
  return (
    <>
      <h2 style={{ wordWrap: 'break-word' }}>Question: {question}</h2>
      <p style={{ color: 'gray' }}>Количество попыток ответов на вопрос: {shots}</p>
    </>
  )
})
