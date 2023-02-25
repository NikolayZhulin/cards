import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Select } from 'antd'

import { useAddCardMutation } from '../../../features/cards'
import { StyledDiv, StyledInput, StyledTextArea, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  cardsPack_id?: string
}

export const AddNewCardModal = create(({ cardsPack_id }: Props) => {
  const modal = useModal()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [format, setFormat] = useState<string>('text')
  const [addCard, { isLoading: cardIsAdding }] = useAddCardMutation()

  const addNewCardHandler = async () => {
    try {
      await addCard({ card: { cardsPack_id, question, answer } })
      setAnswer('')
      setQuestion('')
      setFormat('text')
      modal.hide()
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
        />
        <hr />
        <StyledDiv>Answer</StyledDiv>
        <StyledTextArea
          value={answer}
          onChange={e => setAnswer(e.currentTarget.value)}
          placeholder="Enter your answer"
          bordered={false}
        />
        <hr />
      </div>
    </ModalFC>
  )
})
