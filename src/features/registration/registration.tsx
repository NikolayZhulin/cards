import React, { useEffect } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Alert, App, Spin } from 'antd'
import { useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FormField } from '../../common/components/FormField/FormField'
import {
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCard,
  CardWrapper,
} from '../../common/style'

import { addRegistrationAC } from './registration-reducer'
import { useRegistrationMutation } from './registrationAPI'

export const Registration: React.FC = () => {
  const [registration, { isLoading, data, error, isError }] = useRegistrationMutation<any>()
  const { message } = App.useApp()

  const registered = useAppSelector<boolean>(state => state.registration.registered)
  const dispatch = useAppDispatch()
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    if (data?.addedUser) {
      dispatch(addRegistrationAC({ registered: true }))
      reset()
    }
  }, [data])

  const onSubmit = handleSubmit(requestData => {
    const { email, password } = requestData

    registration({ email, password })
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

  let a = true

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
        {isError && (
          <Alert
            message={error.data.error}
            type="error"
            closable
            style={{ position: 'absolute', top: '73px', left: '42%' }}
          />
        )}
      </CardWrapper>
    </>
  )
}
