import React, { useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { useAddCardMutation } from '../../../features/cards'
import { toggleAddNewCardModal } from '../../../features/cards/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { ModalFC } from './ModalFC'
import { MyNiceModal } from './NiceModal'

type Props = {
  cardsPack_id?: string
  // question: string
  // answer: string
}

export const AddNewCardModal = NiceModal.create(({ cardsPack_id }: Props) => {
  // const openModal = useAppSelector(state => state.cards.isAddNewCardModalOpen)
  // const cardsPack_id = useAppSelector(state => state.cards.packIdForNewCard)
  // const dispatch = useAppDispatch()
  const modal = useModal()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [format, setFormat] = useState<string>('text')
  const [addCard, { isLoading: cardIsAdding }] = useAddCardMutation()

  // const closeModal = () => {
  //   setAnswer('')
  //   setQuestion('')
  //   setFormat('text')
  //   dispatch(toggleAddNewCardModal({ showModal: false }))
  // }
  const addNewCardHandler = () => {
    // try {
    //   if (format === 'text') await addCard({ card: { cardsPack_id, question, answer } }).unwrap()
    //   closeModal()
    // } catch (e) {
    //   console.log(e)
    // }
    debugger
    console.log(cardsPack_id)
    addCard({ card: { cardsPack_id, question, answer } })
  }

  const handleChange = (value: string) => {
    setFormat(value)
  }

  return (
    <MyNiceModal
      okText={'Save'}
      danger={false}
      // isOpen={openModal}
      isLoading={cardIsAdding}
      handleOk={addNewCardHandler}
      // handleCancel={closeModal}
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
    </MyNiceModal>
  )
})
