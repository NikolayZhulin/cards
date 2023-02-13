import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import Input from 'antd/es/input/Input'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  isSuccess: boolean
}

export const EditableSpan = memo(({ value, onChange, isSuccess }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)
  const [disabled, setDisabled] = useState<boolean>(false)
  const error = title === ''
  const errorMessage = 'Field is required!'

  useEffect(() => {
    if (isSuccess) {
      setEditMode(false)
      setDisabled(false)
    }
  }, [isSuccess])

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }
  const activateViewMode = () => {
    if (!error) {
      onChange(title)
      setDisabled(true)
    }
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(1111)
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div>
      <Input
        value={title}
        status={error ? 'error' : ''}
        placeholder={error ? errorMessage : ''}
        onBlur={activateViewMode}
        onPressEnter={activateViewMode}
        onChange={changeTitle}
        disabled={disabled}
        autoFocus
      />
    </div>
  ) : (
    <div>
      <span>{value}</span>
      <EditOutlined onClick={activateEditMode} />
    </div>
  )
})
