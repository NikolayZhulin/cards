import React from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { Input } from 'antd'
import { Control, Controller, FieldErrors } from 'react-hook-form'

import { FormLabel, ValidationErrorSpan, FormContainer } from '../../style'

type FormFieldPropsType = {
  control: Control
  formLabel: string
  errors: FieldErrors
  rules: {
    required: string
    minLength: { value: number; message: string }
    validate?: (value: any) => string | undefined
  }
  fieldPlaceholder: string
  fieldName: string
  inputType?: string
}

export const FormField: React.FC<FormFieldPropsType> = ({
  control,
  formLabel,
  errors,
  rules,
  fieldPlaceholder,
  fieldName,
  inputType,
}) => {
  return (
    <FormContainer>
      <FormLabel>{formLabel}</FormLabel>
      <Controller
        control={control}
        name={fieldName}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={fieldPlaceholder}
            type={inputType}
            style={{ height: '40px', width: '350px' }}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => {
          return <ValidationErrorSpan>{message || 'Unknown error'}</ValidationErrorSpan>
        }}
      />
    </FormContainer>
  )
}
