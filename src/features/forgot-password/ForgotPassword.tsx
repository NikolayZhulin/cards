import React, { useEffect } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Alert, Spin } from 'antd'
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
  FieldInformationText,
} from '../../common/style'
import { isSentRecoveryLetterAC } from '../registration'
import { useForgotPasswordMutation } from '../registration/registrationAPI'

export const ForgotPassword: React.FC = () => {
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation()

  const isLetterRecoverySent = useAppSelector<boolean>(
    state => state.registration.isRecoveryLetterSent
  )
  const error = useAppSelector<string | null>(state => state.registration.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isSentRecoveryLetterAC({ isRecoveryLetterSent: false }))
  }, [isLetterRecoverySent])

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = handleSubmit(requestData => {
    const { email } = requestData

    forgotPassword(email)
  })

  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />

  if (isLetterRecoverySent) {
    debugger

    return <Navigate to={'/check-email'} />
  }
  console.log(isLetterRecoverySent)

  return (
    <>
      <CardWrapper>
        <StyledCard>
          {!isLoading ? (
            <FormWrapper>
              <FormTitle>Forgot your password?</FormTitle>
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
                <FieldInformationText>
                  Enter your email and we will send you further instructions
                </FieldInformationText>
                <PrimaryButton>Send instruction</PrimaryButton>
              </Form>
              <FormInformationText>Did you remember your password?</FormInformationText>
              <NavLink to={'/login'}>Try logging in</NavLink>
            </FormWrapper>
          ) : (
            <Spin indicator={antIcon} style={{ width: '100%', display: 'block' }} />
          )}
        </StyledCard>
        {isError && (
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
