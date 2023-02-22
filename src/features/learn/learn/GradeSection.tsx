import React, { useState } from 'react'

import { Space, Button } from 'antd'
import Radio, { RadioChangeEvent } from 'antd/es/radio'
import styled from 'styled-components'

import { CardType } from '../../tables'

type Props = {
  randomCard: CardType
  grade: number
  changeGrade: (e: RadioChangeEvent) => void
  updateCardGrade: () => void
}

export const GradeSection: React.FC<Props> = ({
  grade,
  randomCard,
  changeGrade,
  updateCardGrade,
}) => {
  const [isHidden, setIsHidden] = useState(true)

  const showAnswer = () => {
    setIsHidden(false)
  }

  const hideAnswer = () => {
    setIsHidden(true)
  }

  if (isHidden) {
    return (
      <Button type={'primary'} style={{ width: '100%' }} onClick={showAnswer}>
        Show Answer
      </Button>
    )
  }

  return (
    <HiddenSection>
      <h3 style={{ wordWrap: 'break-word' }}>Answer: {randomCard.answer}</h3>
      <Radio.Group onChange={changeGrade} value={grade}>
        <Space direction={'vertical'}>
          <Radio value={5}>Knew the answer</Radio>
          <Radio value={4}>Confused</Radio>
          <Radio value={3}>A lot of thought</Radio>
          <Radio value={2}>Forgot</Radio>
          <Radio value={1}>Did not know</Radio>
        </Space>
      </Radio.Group>
      <Button onClick={updateCardGrade} type={'primary'}>
        Next
      </Button>
    </HiddenSection>
  )
}

const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
`
