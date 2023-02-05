import React from 'react'

import Button from 'antd/es/button/button'
import Checkbox from 'antd/es/checkbox/Checkbox'
import Input from 'antd/es/input/Input'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useLoginMutation } from './loginApi'

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const Login = () => {
  const [login, { isLoading, data, error }] = useLoginMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    // defaultValues: {
    // email: "nya-admin@nya.nya",
    // password: "1qazxcvBG",
    // rememberMe: false
    // }
    mode: 'onBlur',
  })

  // data needs to be destructured because react hook form type doesn't assign of useLoginMutation type
  const onSubmit = handleSubmit(data => {
    const { email, password, rememberMe } = data

    login({ email, password, rememberMe })
    setTimeout(() => {
      reset()
    }, 1000)
  })

  return (
    <StyleForLoginPage>
      <h1>Sign in</h1>
      <form className="form" onSubmit={onSubmit}>
        <section>
          <label>Email</label>
          <Controller
            control={control}
            name="email"
            rules={{
              pattern: EMAIL_REGEXP,
              required: 'Field is required!',
            }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.email && <div className={'error'}>Enter email</div>}
        </section>
        <section>
          <label>Password</label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Field is required!',
            }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.password && <div className={'error'}>Enter password</div>}
        </section>
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

      <div>Already have an account?</div>
      <Link to={'/registration'}>Sign Up</Link>
    </StyleForLoginPage>
  )
}

const StyleForLoginPage = styled.div`
  background-color: moccasin;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 552px;
  max-height: 70%;
  width: 413px;
  max-width: 90%;
  padding: 35px 33px 42px 33px;

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 367px;
    width: 100%;

    .forgotPassword {
      display: block;
      width: 100%;
      text-align: right;
    }
  }

  .ant-btn.css-dev-only-do-not-override-ixblex.ant-btn-primary {
    width: 100%;
  }

  section {
    min-height: 74px;
    width: 100%;
  }

  .error {
    color: red;
  }
`
