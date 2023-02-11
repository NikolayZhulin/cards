import React, { memo, useEffect, useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import { Form } from '../../style'
import { FormField } from '../FormField/FormField'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  disabled?: boolean
  isSuccess: any
}

export const EditableSpan = memo(
  ({ value, onChange, disabled = false, isSuccess }: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    const {
      formState: { errors },
      handleSubmit,
      control,
      getValues,
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
      isSuccess && setEditMode(false)
    }, [isSuccess])

    const activateEditMode = () => {
      if (!disabled) {
        setEditMode(true)
      }
    }
    const activateViewMode = handleSubmit(data => {
      onChange(data.title)
    })

    return editMode ? (
      <div>
        <Form onSubmit={activateViewMode}>
          <FormField
            control={control}
            formLabel={''}
            errors={errors}
            rules={{
              required: 'Field required',
              minLength: { value: 1, message: 'Min length 1 characters' },
            }}
            fieldPlaceholder={value}
            fieldName={'title'}
            isPasswordType={false}
          />
        </Form>
      </div>
    ) : (
      <div>
        <span>{value}</span>
        <EditOutlined onClick={activateEditMode} />
      </div>
    )
  }
)
