import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Select, UploadFile } from 'antd'

import { useUpdateCardMutation } from '../../../features/cards'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledDiv, StyledInput, StyledTextArea, StyledTitle } from '../../style/modal-styles'
import { beforeUpload } from '../../utils/convert-to-base64'
import { UploadField } from '../upload-field/UploadField'

import { ModalFC } from './ModalFC'

type Props = {
  prevAnswer?: string
  cardId?: string
  prevQuestionImg: string
  prevQuestion?: string
}

export const UpdateCardModal = create(
  ({ cardId, prevAnswer, prevQuestion, prevQuestionImg }: Props) => {
    const modal = useModal()
    const inputTagRef = useAutoFocus()
    const [question, setQuestion] = useState<string>(prevQuestion as string)
    const [answer, setAnswer] = useState<string>(prevAnswer as string)
    const [format, setFormat] = useState<'image' | 'text'>(prevQuestionImg ? 'image' : 'text')
    const [updateCard, { isLoading: cardIsUpdating }] = useUpdateCardMutation()
    const [questionImg, setQuestionImg] = useState(prevQuestionImg || '')
    const [fileError, setFileError] = useState(false)

    const updateCardHandler = async () => {
      if (format === 'text') {
        try {
          await updateCard({ card: { _id: cardId as string, question, answer } })
          await modal.hide()
        } catch (e) {
          console.log(e)
        }
      }
      if (format === 'image') {
        try {
          await updateCard({ card: { _id: cardId as string, questionImg, answer } })
          await modal.hide()
        } catch (e) {
          console.log(e)
        }
      }
    }

    const handleChange = (value: 'image' | 'text') => {
      setFormat(value)
    }
    const imgHandler = async (file: UploadFile) => {
      const isSuccessFile = await beforeUpload(file, setQuestionImg)

      setFileError(!isSuccessFile)
    }
    const onRemove = () => {
      setFileError(false)
      setQuestionImg('')
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
        disable={fileError}
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
          {format === 'text' && (
            <StyledInput
              value={question}
              onChange={e => setQuestion(e.currentTarget.value)}
              placeholder="Enter your question"
              bordered={false}
              ref={inputTagRef}
            />
          )}
          {format === 'image' && (
            <UploadField beforeUpload={imgHandler} onRemove={onRemove} img={questionImg} />
          )}
          <img src={questionImg} style={{ width: '300px' }} />
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
  }
)
