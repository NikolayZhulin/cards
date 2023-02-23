import React, { memo } from 'react'

import { useAppSelector } from '../../../common/hooks/reduxHooks'

type Props = {
  question: string
  shots: number
}

export const CardContent = memo(({ question, shots }: Props) => {
  const packName = useAppSelector(state => state.learn.packName)

  return (
    <>
      <h1>{packName}</h1>

      <h2 style={{ wordWrap: 'break-word' }}>Question: {question}</h2>
      <p style={{ color: 'gray' }}>Количество попыток ответов на вопрос: {shots}</p>
    </>
  )
})
