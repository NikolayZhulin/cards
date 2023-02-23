import React, { useEffect, useState } from 'react'

import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { toggleUpdateCardModal } from '../../../features/tables/cards-reducer'
import { useUpdateCardMutation } from '../../../features/tables/tablesApi'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { ModalFC } from './ModalFC'

export const UpdateCardModal = () => {
  const cardId = useAppSelector(state => state.cards.cardForUpdate.id)
  const showModal = useAppSelector(state => state.cards.isUpdateCardModalOpen)
  const prevFormat = useAppSelector(state => state.cards.cardForUpdate.format)
  const prevQuestion = useAppSelector(state => state.cards.cardForUpdate.question)
  const prevAnswer = useAppSelector(state => state.cards.cardForUpdate.answer)
  const [question, setQuestion] = useState<string>(prevQuestion)
  const [answer, setAnswer] = useState<string>(prevAnswer)
  const [format, setFormat] = useState<string>(prevFormat)
  const [updateCard, { isLoading: cardIsUpdating }] = useUpdateCardMutation()
  const dispatch = useAppDispatch()

  const closeModal = () => {
    setAnswer('')
    setQuestion('')
    setFormat('text')
    dispatch(toggleUpdateCardModal({ showModal: false }))
  }
  const updateCardHandler = async () => {
    try {
      if (format === 'text') await updateCard({ card: { _id: cardId, question, answer } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }
  const handleChange = (value: string) => {
    setFormat(value)
  }

  useEffect(() => {
    setAnswer(prevAnswer)
    setQuestion(prevQuestion)
    setFormat(prevFormat)
  }, [prevQuestion, prevAnswer, prevFormat])

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={showModal}
      isLoading={cardIsUpdating}
      handleOk={updateCardHandler}
      handleCancel={closeModal}
    >
      <div>
        <h3>Edit card</h3>
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
