import { memo } from 'react'

import { Button, Radio, Space } from 'antd'

import { CardType } from '../../tables'
import { useToggleGradeSection } from '../hooks'
import { useUpdateCard } from '../hooks/use-update-card'
import { HiddenSection, NextCardButton } from '../styles'

type Props = {
  randomCard: CardType
  changeCard: () => void
}

export const GradeSection = memo(({ randomCard, changeCard }: Props) => {
  const { isHidden, hideAnswer, showAnswer } = useToggleGradeSection()

  const { grade, changeGrade, updateCardGrade } = useUpdateCard(randomCard, changeCard)

  const changeCardHandler = () => {
    updateCardGrade()
    hideAnswer()
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
      <NextCardButton onClick={changeCardHandler} type={'primary'}>
        Next
      </NextCardButton>
    </HiddenSection>
  )
})
