import React, { useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { useUpdateCardMutation } from '../../../features/cards'

import { ModalFC } from './ModalFC'

type Props = {
  prevAnswer?: string
  prevFormat?: string
  cardId?: string
  prevQuestion?: string
}

export const UpdateCardModal = NiceModal.create(
  ({ cardId, prevAnswer, prevQuestion, prevFormat }: Props) => {
    const modal = useModal()
    const [question, setQuestion] = useState<string>(prevQuestion as string)
    const [answer, setAnswer] = useState<string>(prevAnswer as string)
    const [format, setFormat] = useState<string>((prevFormat as string) || 'text')
    const [updateCard, { isLoading: cardIsUpdating }] = useUpdateCardMutation()

    const updateCardHandler = async () => {
      try {
        if (format === 'text') {
          await updateCard({ card: { _id: cardId as string, question, answer } }).unwrap()
          modal.hide()
        }
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
)
