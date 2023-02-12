import React, { useRef } from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { Input } from 'antd'
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'

import { FormLabel, ValidationErrorSpan, FormContainer } from '../../style'

type FormFieldPropsType = {
  control: Control
  formLabel: string
  errors: FieldErrors
  fieldPlaceholder: string
  fieldName: string
  inputType?: 'password' | 'text' | 'email' | 'number'
}

export const FormField: React.FC<FormFieldPropsType> = ({
  control,
  formLabel,
  errors,
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
        render={({ field }) =>
          !(inputType === 'password') ? (
            <Input
              {...field}
              placeholder={fieldPlaceholder}
              type={inputType}
              style={{ height: '40px', width: '320px' }}
            />
          ) : (
            <Input.Password
              {...field}
              placeholder={fieldPlaceholder}
              type={inputType}
              style={{ height: '40px', width: '320px' }}
            />
          )
        }
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
