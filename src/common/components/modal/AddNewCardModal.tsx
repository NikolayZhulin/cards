import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Select, UploadFile } from 'antd'

import { useAddCardMutation } from '../../../features/cards'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledDiv, StyledInput, StyledTextArea, StyledTitle } from '../../style/modal-styles'
import { beforeUpload } from '../../utils/convert-to-base64'
import { UploadField } from '../upload-field/UploadField'

import { ModalFC } from './ModalFC'

type Props = {
  cardsPack_id?: string
}

export const AddNewCardModal = create(({ cardsPack_id }: Props) => {
  const modal = useModal()
  const inputTagRef = useAutoFocus()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [format, setFormat] = useState<'text' | 'image'>('text')
  const [addCard, { isLoading: cardIsAdding }] = useAddCardMutation()
  const [questionImg, setQuestionImg] = useState('')
  const [fileError, setFileError] = useState(false)

  console.log(fileError)
  const addNewCardHandler = async () => {
    if (format === 'text') {
      try {
        await addCard({ card: { cardsPack_id, question, answer } })
        await modal.hide()
      } catch (e) {
        console.log(e)
      }
    }
    if (format === 'image') {
      try {
        await addCard({ card: { cardsPack_id, questionImg, answer } })
        await modal.hide()
      } catch (e) {
        console.log(e)
      }
    }
  }
  const imgHandler = async (file: UploadFile) => {
    const isSuccessFile = await beforeUpload(file, setQuestionImg)

    setFileError(!isSuccessFile)
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
      disable={fileError}
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
        {format === 'image' && (
          <UploadField
            beforeUpload={imgHandler}
            onRemove={() => setQuestionImg('')}
            img={questionImg}
          />
        )}
        {format === 'text' && (
          <StyledInput
            value={question}
            onChange={e => setQuestion(e.currentTarget.value)}
            placeholder="Enter your question"
            bordered={false}
            ref={inputTagRef}
          />
        )}
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
