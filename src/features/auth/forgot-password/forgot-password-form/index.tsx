import React from 'react'

import { NavLink } from 'react-router-dom'

import { FormField, Preloader } from '../../../../common/components'
import {
  FieldInformationText,
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
} from '../../../../common/style'
import { PATH } from '../../../../common/utils/path'
import { useForgotPassword } from '../hooks/use-forgot-password'

export const ForgotPasswordForm = () => {
  const { onSubmit, errors, control, isLoading } = useForgotPassword()

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Forgot your password?</FormTitle>
      <Form onSubmit={onSubmit}>
        <FormField
          control={control}
          formLabel={'Email:'}
          errors={errors}
          fieldPlaceholder={'Email'}
          fieldName={'email'}
        />
        <FieldInformationText>
          Enter your email and we will send you further instructions
        </FieldInformationText>
        <PrimaryButton>Send instruction</PrimaryButton>
      </Form>
      <FormInformationText>Did you remember your password?</FormInformationText>
      <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
    </FormWrapper>
  )
}
