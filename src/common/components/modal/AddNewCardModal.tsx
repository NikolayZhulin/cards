import React, { useState } from 'react'

import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { toggleAddNewCardModal } from '../../../features/tables/cards-reducer'
import { useAddCardMutation } from '../../../features/tables/tablesApi'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { ModalFC } from './ModalFC'

export const AddNewCardModal = () => {
  const openModal = useAppSelector(state => state.cards.isAddNewCardModalOpen)
  const cardsPack_id = useAppSelector(state => state.cards.packIdForNewCard)
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [format, setFormat] = useState<string>('text')
  const [addCard, { isLoading: cardIsAdding }] = useAddCardMutation()

  const closeModal = () => {
    setAnswer('')
    setQuestion('')
    setFormat('text')
    dispatch(toggleAddNewCardModal({ showModal: false }))
  }
  const addNewCardHandler = async () => {
    try {
      if (format === 'text') await addCard({ card: { cardsPack_id, question, answer } }).unwrap()
      closeModal()
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
      isOpen={openModal}
      isLoading={cardIsAdding}
      handleOk={addNewCardHandler}
      handleCancel={closeModal}
    >
      <div>
        <h3>Add new card</h3>
        <hr />
        <div>Choose a question format</div>
        <Select
          value={format}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'text', label: 'text' },
            { value: 'image', label: 'image' },
          ]}
        />
        <div>Question</div>
        <Input
          value={question}
          onChange={e => setQuestion(e.currentTarget.value)}
          placeholder="Enter your question"
          bordered={false}
        />
        <div>Answer</div>
        <TextArea
          value={answer}
          onChange={e => setAnswer(e.currentTarget.value)}
          placeholder="Enter your answer"
          bordered={false}
        />
      </div>
    </ModalFC>
  )
}
