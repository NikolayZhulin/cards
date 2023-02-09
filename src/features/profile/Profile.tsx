import React, { useEffect } from 'react'

import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CardWrapper, FormTitle, FormWrapper, StyledCard } from '../../common/style'
import { useLogOutMutation, useMeMutation } from '../auth/authAPI'

import { useChangeUserMutation } from './profile-api'

import { EditableSpan } from './index'

export const Profile = () => {
  const [getProfile, {}] = useMeMutation<any>()
  const [changeUser, {}] = useChangeUserMutation<any>()
  const [logOut, {}] = useLogOutMutation<any>()
  const avatar = useAppSelector(state => state.profile.user.avatar)
  const name = useAppSelector(state => state.profile.user.name)
  const email = useAppSelector(state => state.profile.user.email)
  const isLoading = useAppSelector(state => state.profile.isLoading)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const onClickLogOutHandler = () => {
    logOut({})
  }
  const onChangeHandler = (value: string) => {
    changeUser({ name: value })
  }

  useEffect(() => {
    getProfile({})
  }, [])

  if (isLoading) return <div>loading...</div>
  if (!isLoggedIn) return <Navigate to={'/login'} />

  return (
    <CardWrapper>
      <StyledCard style={{ width: '400px' }}>
        <FormWrapper>
          <FormTitle>Personal information</FormTitle>
          <div>
            <img src={avatar} alt="photo" style={{ height: '100px', borderRadius: '50%' }} />
          </div>
          <EditableSpan value={name} onChange={onChangeHandler} />
          <div>{email}</div>
          <div>
            <Button
              icon={<LogoutOutlined />}
              onClick={onClickLogOutHandler}
              type={'default'}
              htmlType={'button'}
              style={{ width: '100%' }}
            >
              Log out
            </Button>
          </div>
        </FormWrapper>
      </StyledCard>
    </CardWrapper>
  )
}
