import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Alert, Spin } from 'antd'
import { useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { FormField } from '../../../common/components/FormField/FormField'
import {
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCard,
  CardWrapper,
} from '../../../common/style'
import { useRegistrationMutation } from '../authAPI'

export const Registration: React.FC = () => {
  const [registration, { isLoading }] = useRegistrationMutation()

  const registered = useAppSelector<boolean>(state => state.registration.registered)
  const error = useAppSelector<string | null>(state => state.registration.error)
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

  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />

  const confirmPasswordValidate = (value: string) => {
    if (watch('password') != value) {
      return 'Your passwords do no match'
    }
  }

  if (registered) {
    return <Navigate to={'/login'} />
  }
  console.log(error)

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
                />
                <PrimaryButton>Submit</PrimaryButton>
              </Form>
              <FormInformationText>Already have an account?</FormInformationText>
              <NavLink to={'/login'}>Sign in</NavLink>
            </FormWrapper>
          ) : (
            <Spin indicator={antIcon} style={{ width: '100%', display: 'block' }} />
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
}
