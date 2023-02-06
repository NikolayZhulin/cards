import React, { useEffect } from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { Alert, App, Button, Input, Space } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FormLabel } from '../../common/style/styled-components'

import { FormContainer, StyledCard } from './register-style'
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

  if (registered) {
    return <Navigate to={'/login'} />
  }
  // isError && message.error('Error!')

  return (
    <>
      <Space
        align="center"
        style={{
          width: '100%',
          height: `calc(100vh - 60px)`,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StyledCard>
          <div
            style={{
              height: '450px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ marginTop: '0', fontWeight: '700', fontSize: '26px' }}>Sign up</h3>
            <form
              onSubmit={onSubmit}
              style={{
                height: '70%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <FormContainer>
                <FormLabel>Email:</FormLabel>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: 'Field required', minLength: 3 }}
                  render={({ field }) => <Input {...field} placeholder={'Email'} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => {
                    return <span style={{ color: 'red' }}>{message || 'Error'}</span>
                  }}
                />
              </FormContainer>
              <FormContainer>
                <FormLabel>Password:</FormLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Field required',
                    minLength: { value: 5, message: 'Min length 5 characters' },
                  }}
                  render={({ field }) => (
                    <Input {...field} placeholder={'password'} type={'password'} />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => {
                    return <span style={{ color: 'red' }}>{message || 'Error'}</span>
                  }}
                />
              </FormContainer>
              <FormContainer>
                <FormLabel>Confirm password:</FormLabel>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Field required',
                    minLength: { value: 5, message: 'Min length 5 characters' },
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return 'Your passwords do no match'
                      }
                    },
                  }}
                  render={({ field }) => (
                    <Input {...field} placeholder={'password'} type={'password'} />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => {
                    return <span style={{ color: 'red' }}>{message || 'Error'}</span>
                  }}
                />
              </FormContainer>
              <Button type={'primary'} htmlType={'submit'} style={{ width: '100%' }}>
                Submit
              </Button>
            </form>
            <div style={{ color: 'black', opacity: '0.5', fontSize: '14px' }}>
              Already have an account?
            </div>
            <NavLink to={'/login'}>Sign in</NavLink>
          </div>
        </StyledCard>
        {isError && (
          <Alert
            message={error.data.error}
            type="error"
            closable
            style={{ position: 'absolute', top: '73px', left: '42%' }}
          />
        )}
      </Space>
    </>
  )
}
