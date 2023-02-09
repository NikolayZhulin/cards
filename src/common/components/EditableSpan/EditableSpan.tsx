import React, { ChangeEvent, useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import Input from 'antd/es/input/Input'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  disabled?: boolean
}

export const EditableSpan = React.memo(
  ({ value, onChange, disabled = false }: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(value)

    const activateEditMode = () => {
      if (!disabled) {
        setEditMode(true)
        setTitle(value)
      }
    }
    const activateViewMode = () => {
      setEditMode(false)
      onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return editMode ? (
      <div>
        <Input
          value={title}
          onBlur={activateViewMode}
          onPressEnter={activateViewMode}
          onChange={changeTitle}
          autoFocus
        />
      </div>
    ) : (
      <div>
        <span onDoubleClick={activateEditMode}>{value}</span>
        <EditOutlined />
      </div>
    )
  }
)
