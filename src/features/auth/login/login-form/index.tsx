import React from 'react'

import { Controller } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { FormField, Preloader } from '../../../../common/components'
import {
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCheckBox,
} from '../../../../common/style'
import { useLogin } from '../hooks/use-login'

export const LoginForm = () => {
  const { onSubmit, errors, control, isLoading } = useLogin()

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Log In</FormTitle>
      <Form onSubmit={onSubmit}>
        <FormField
          control={control}
          formLabel={'Email:'}
          errors={errors}
          fieldPlaceholder={'Email'}
          fieldName={'email'}
        />
        <FormField
          control={control}
          formLabel={'Password:'}
          errors={errors}
          fieldPlaceholder={'Password'}
          fieldName={'password'}
          inputType={'password'}
        />
        <Controller
          control={control}
          name="rememberMe"
          render={({ field }) => (
            <StyledCheckBox {...field} checked={!!field.value}>
              Remember Me
            </StyledCheckBox>
          )}
        />
        <NavLink to={'/recover-password'}>Forgot Password?</NavLink>
        <PrimaryButton>Submit</PrimaryButton>
      </Form>
      <FormInformationText>Dont have an account yet?</FormInformationText>
      <NavLink to={'/registration'}>Sign Up</NavLink>
    </FormWrapper>
  )
}
