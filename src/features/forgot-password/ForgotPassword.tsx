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
import { useRegistrationMutation } from '../registration/registrationAPI'

import { addRegistrationAC } from './forgot-password-reducer'

export const ForgotPassword: React.FC = () => {
  //const [registration, { isLoading, data, error, isError }] = useRegistrationMutation<any>()

  const registered = useAppSelector<boolean>(state => state.registration.registered)
  const dispatch = useAppDispatch()
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({ mode: 'onBlur' })

  // useEffect(() => {
  //   if (data?.addedUser) {
  //     dispatch(addRegistrationAC({ registered: true }))
  //     reset()
  //   }
  // }, [data])

  const onSubmit = handleSubmit(requestData => {
    console.log(1111)
  })

  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />

  if (registered) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <CardWrapper>
        <StyledCard>
          <FormWrapper>
            <FormTitle>Forgot your password?</FormTitle>
            <Form onSubmit={onSubmit}>
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
              <FieldInformationText>
                Enter your email and we will send you further instructions
              </FieldInformationText>
              <PrimaryButton>Submit</PrimaryButton>
            </Form>
            <FormInformationText>Did you remember your password?</FormInformationText>
            <NavLink to={'/login'}>Try logging in</NavLink>
          </FormWrapper>
          {/*<Spin indicator={antIcon} style={{width: '100%', display: 'block'}}/>*/}
        </StyledCard>
        {/*{isError && (*/}
        {/*  <Alert*/}
        {/*    style={{ position: 'absolute', bottom: '3%' }}*/}
        {/*    message={error?.data.error || 'Some Error'}*/}
        {/*    type="error"*/}
        {/*    closable*/}
        {/*  />*/}
        {/*)}*/}
      </CardWrapper>
    </>
  )
}
