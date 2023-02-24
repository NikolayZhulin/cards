import React, { useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { useAddCardMutation } from '../../../features/cards'

import { ModalFC } from './ModalFC'

type Props = {
  cardsPack_id?: string
}

export const AddNewCardModal = NiceModal.create(({ cardsPack_id }: Props) => {
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
    </ModalFC>
  )
})
