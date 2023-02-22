import React from 'react'

type Props = {
  packName: string
  question: string
  shots: number
}

export const CardContent = ({ packName, question, shots }: Props) => {
  return (
    <>
      <h1>{packName}</h1>

      <h2 style={{ wordWrap: 'break-word' }}>Question: {question}</h2>
      <p style={{ color: 'gray' }}>Количество попыток ответов на вопрос: {shots}</p>
    </>
  )
}
