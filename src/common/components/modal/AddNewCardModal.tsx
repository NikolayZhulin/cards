import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Select } from 'antd'

import { useAddCardMutation } from '../../../features/cards'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledDiv, StyledInput, StyledTextArea, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  cardsPack_id?: string
}

export const AddNewCardModal = create(({ cardsPack_id }: Props) => {
  const modal = useModal()
  const inputTagRef = useAutoFocus()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [format, setFormat] = useState<string>('text')
  const [addCard, { isLoading: cardIsAdding }] = useAddCardMutation()

  const addNewCardHandler = async () => {
    try {
      format === 'text' && (await addCard({ card: { cardsPack_id, question, answer } }))
      await modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={modal.visible}
      isLoading={cardIsAdding}
      handleOk={addNewCardHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <StyledTitle>Add new card</StyledTitle>
        <hr />
        <StyledDiv>Choose a question format</StyledDiv>
        <Select
          value={format}
          style={{ width: '100%' }}
          onChange={e => setFormat(e)}
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
