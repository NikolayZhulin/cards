import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Select } from 'antd'

import { useUpdateCardMutation } from '../../../features/cards'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledDiv, StyledInput, StyledTextArea, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  prevAnswer?: string
  prevFormat?: string
  cardId?: string
  prevQuestion?: string
}

export const UpdateCardModal = create(({ cardId, prevAnswer, prevQuestion, prevFormat }: Props) => {
  const modal = useModal()
  const inputTagRef = useAutoFocus()
  const [question, setQuestion] = useState<string>(prevQuestion as string)
  const [answer, setAnswer] = useState<string>(prevAnswer as string)
  const [format, setFormat] = useState<string>((prevFormat as string) || 'text')
  const [updateCard, { isLoading: cardIsUpdating }] = useUpdateCardMutation()

  const updateCardHandler = async () => {
    try {
      format === 'text' && (await updateCard({ card: { _id: cardId as string, question, answer } }))
      await modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (value: string) => {
    setFormat(value)
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={modal.visible}
      isLoading={cardIsUpdating}
      handleOk={updateCardHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <StyledTitle>Edit card</StyledTitle>
        <hr />
        <StyledDiv>Choose a question format</StyledDiv>
        <Select
          value={format}
          style={{ width: '100%' }}
          onChange={handleChange}
          options={[
            { value: 'text', label: 'text' },
            { value: 'image', label: 'image' },
          ]}
        />
        <StyledDiv>Question</StyledDiv>
        <StyledInput
          value={question}
          onChange={e => setQuestion(e.currentTarget.value)}
          placeholder="Enter your question"
          bordered={false}
          ref={inputTagRef}
        />
        <hr />
        <StyledDiv>Answer</StyledDiv>
        <StyledTextArea
          value={answer}
          onChange={e => setAnswer(e.currentTarget.value)}
          placeholder="Enter your answer"
          bordered={false}
          autoSize
        />
        <hr />
      </div>
    </ModalFC>
  )
})
