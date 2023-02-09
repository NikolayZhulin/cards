import React, { useState } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Alert, Button, Input, Spin } from 'antd'
import { Navigate, useParams } from 'react-router-dom'

import {
  CardWrapper,
  FormInformationText,
  FormTitle,
  FormWrapper,
  StyledCard,
} from '../../../common/style'
import { useSetNewPasswordMutation } from '../authAPI'

export const SetNewPassword: React.FC = () => {
  const [setPass, { isSuccess }] = useSetNewPasswordMutation()
  const [value, setValue] = useState<string>('')
  const error = ''
  const isLoading = false
  const { token } = useParams<{ token: string }>()

  const onClickCreateHandler = () => {
    setPass({ password: value, resetPasswordToken: token })
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <CardWrapper>
        <StyledCard style={{ width: '400px' }}>
          {!isLoading ? (
            <FormWrapper>
              <FormTitle>Create new password</FormTitle>
              <Input.Password
                value={value}
                placeholder="Password"
                onChange={e => {
                  setValue(e.currentTarget.value)
                }}
              />
              <FormInformationText>
                Create new password and we will send you further instructions to email
              </FormInformationText>
              <div>
                <Button
                  onClick={onClickCreateHandler}
                  type={'primary'}
                  htmlType={'button'}
                  style={{ width: '100%' }}
                >
                  Create new password
                </Button>
              </div>
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
