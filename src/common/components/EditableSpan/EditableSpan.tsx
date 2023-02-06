import React, { ChangeEvent, useState } from 'react'

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
      <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
    ) : (
      <span onDoubleClick={activateEditMode}>{value}</span>
    )
  }
)
