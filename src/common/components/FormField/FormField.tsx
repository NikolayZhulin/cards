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
  rules: {
    pattern?: any
    required: string
    minLength: { value: number; message: string }
    validate?: (value: any) => string | undefined
  }
  fieldPlaceholder: string
  fieldName: string
  inputType?: string
  isPasswordType: boolean
}

export const FormField: React.FC<FormFieldPropsType> = ({
  control,
  formLabel,
  errors,
  rules,
  fieldPlaceholder,
  fieldName,
  inputType,
  isPasswordType,
}) => {
  return (
    <FormContainer>
      <FormLabel>{formLabel}</FormLabel>
      <Controller
        control={control}
        name={fieldName}
        rules={rules}
        render={({ field }) =>
          !isPasswordType ? (
            <Input
              {...field}
              placeholder={fieldPlaceholder}
              type={inputType}
              style={{ height: '40px', width: '350px' }}
            />
          ) : (
            <Input.Password
              {...field}
              placeholder={fieldPlaceholder}
              type={inputType}
              style={{ height: '40px', width: '350px' }}
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

// type InpPropsType = {
//   passwordType: boolean
//   placeholder: string
//   type: string | undefined
//   style: any
// }
//
// export const Inp: React.FC<InpPropsType & ControllerRenderProps<FieldValues, string>> = ({
//   passwordType,
//   ...restProps
// }) => {
//   return passwordType ? <Input.Password {...restProps} /> : <Input {...restProps} />
// }
