import React from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { Alert } from 'antd'
import Button from 'antd/es/button/button'
import Checkbox from 'antd/es/checkbox/Checkbox'
import Input from 'antd/es/input/Input'
import { Controller, useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector } from '../../../app/hooks'
import { FormContainer, StyledCard, FormLabel, CardWrapper } from '../../../common/style'
import { useLoginMutation } from '../authAPI'

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const Login = () => {
  const [login, { error, isError }] = useLoginMutation()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = handleSubmit(async data => {
    const { email, password, rememberMe } = data

    await login({ email, password, rememberMe })
    reset()
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <LoginPageStyle>
      <CardWrapper>
        <StyledCard>
          <div className={'wrapper'}>
            <h3 className={'title'}>Log In</h3>
            <form className="form" onSubmit={onSubmit}>
              <FormContainer>
                <FormLabel>Email:</FormLabel>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    pattern: EMAIL_REGEXP,
                    required: 'Field is required!',
                    minLength: { value: 3, message: 'Email should be longer then 3 symbols' },
                  }}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name={'email'}
                  render={({ message }) => (
                    <div className={'error'}>{message || "Email insn't valid"}</div>
                  )}
                />
              </FormContainer>
              <FormContainer>
                <FormLabel>Password:</FormLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Field is required!',
                    minLength: { value: 5, message: 'Password should be longer then 5 symbols' },
                  }}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name={'password'}
                  render={({ message }) => <div className={'error'}>{message || 'Error'}</div>}
                />
              </FormContainer>
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <Checkbox {...field} checked={!!field.value}>
                    Remember Me
                  </Checkbox>
                )}
              />
              <Link className={'forgotPassword'} to={'/recover-password'}>
                Forgot Password?
              </Link>
              <Button type="primary" htmlType="submit" disabled={!isValid}>
                Submit
              </Button>
            </form>
            <div>Dont have an account yet?</div>
            <Link to={'/registration'}>Sign Up</Link>
          </div>
        </StyledCard>
      </CardWrapper>
      {isError && <Alert message={'error.data.error'} type="error" closable />}
    </LoginPageStyle>
  )
}

const LoginPageStyle = styled.div`
  .form {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .wrapper {
    height: 450px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-top: 0;
    font-weight: 700;
    font-size: 26px;
  }

  .ant-space.css-dev-only-do-not-override-ixblex.ant-space-horizontal.ant-space-align-center {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .ant-alert.ant-alert-error.ant-alert-no-icon.css-dev-only-do-not-override-ixblex {
    position: absolute;
    top: 73px;
    left: 42%;
  }
  .error {
    color: red;
  }
  .ant-card.ant-card-bordered.sc-kDvujY.ibBuSd.css-dev-only-do-not-override-j0nf2s {
    max-width: 80%;
    width: 400px;
  }
`
