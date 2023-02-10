import React, { memo } from 'react'

import { Alert } from 'antd'
import { useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { FormField } from '../../../common/components/FormField/FormField'
import { Preloader } from '../../../common/components/preloader/Preloader'
import {
  CardWrapper,
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCard,
} from '../../../common/style'
import { useRegistrationMutation } from '../authAPI'

export const Registration: React.FC = memo(() => {
  const [registration, { isLoading, data }] = useRegistrationMutation()

  const error = useAppSelector<string | null>(state => state.auth.error)
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = handleSubmit(async requestData => {
    const { email, password } = requestData

    await registration({ email, password })
    reset()
  })

  const confirmPasswordValidate = (value: string) => {
    if (watch('password') != value) {
      return 'Your passwords do no match'
    }
  }

  if (data?.addedUser) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <CardWrapper>
        <StyledCard>
          {!isLoading ? (
            <FormWrapper>
              <FormTitle>Sign up</FormTitle>
              <Form onSubmit={onSubmit}>
                <FormField
                  control={control}
                  formLabel={'Email:'}
                  errors={errors}
                  rules={{
                    required: 'Field required',
                    minLength: { value: 5, message: 'Min length 5 characters' },
                  }}
                  fieldPlaceholder={'Email'}
                  fieldName={'email'}
                  isPasswordType={false}
                />
                <FormField
                  control={control}
                  formLabel={'Password:'}
                  errors={errors}
                  rules={{
                    required: 'Field required',
                    minLength: { value: 5, message: 'Min length 5 characters' },
                  }}
                  fieldPlaceholder={'Password'}
                  fieldName={'password'}
                  inputType={'password'}
                  isPasswordType={true}
                />
                <FormField
                  control={control}
                  formLabel={'Confirm password:'}
                  errors={errors}
                  rules={{
                    required: 'Field required',
                    minLength: { value: 5, message: 'Min length 5 characters' },
                    validate: confirmPasswordValidate,
                  }}
                  fieldPlaceholder={'Confirm password'}
                  fieldName={'confirmPassword'}
                  inputType={'password'}
                  isPasswordType={true}
                />
                <PrimaryButton>Submit</PrimaryButton>
              </Form>
              <FormInformationText>Already have an account?</FormInformationText>
              <NavLink to={'/login'}>Sign in</NavLink>
            </FormWrapper>
          ) : (
            <Preloader />
          )}
        </StyledCard>
        {error && (
          <Alert
            style={{ position: 'absolute', bottom: '3%' }}
            message={error}
            type="error"
            closable
          />
        )}
      </CardWrapper>
    </>
  )
})
