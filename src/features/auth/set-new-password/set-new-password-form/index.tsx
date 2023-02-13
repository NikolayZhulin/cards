import React from 'react'

import { FormField, Preloader } from '../../../../common/components'
import {
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
} from '../../../../common/style'
import { useSetNewPassword } from '../hooks/use-set-new-password'

export const SetNewPasswordForm = () => {
  const { errors, onSubmit, control, isLoading } = useSetNewPassword()

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Create new password</FormTitle>
      <Form onSubmit={onSubmit}>
        <FormField
          control={control}
          formLabel={'Password:'}
          errors={errors}
          fieldPlaceholder={'Password'}
          fieldName={'password'}
          inputType={'password'}
        />
        <FormInformationText>
          Create new password and we will send you further instructions to email
        </FormInformationText>
        <PrimaryButton>Create new password</PrimaryButton>
      </Form>
    </FormWrapper>
  )
}
