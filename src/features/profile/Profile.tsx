import React, { useEffect } from 'react'

import { Button } from 'antd'
import Space from 'antd/es/space'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FormContainer, StyledCard } from '../../common/style/styled-components'

import { useChangeUserMutation, useGetUserProfileMutation, useLogOutMutation } from './profile-api'

import { EditableSpan } from './index'

export const Profile = () => {
  const [getProfile, {}] = useGetUserProfileMutation<any>()
  const [changeUser, {}] = useChangeUserMutation<any>()
  const [logOut, {}] = useLogOutMutation<any>()
  const avatar = useAppSelector(state => state.profile.user.avatar)
  const name = useAppSelector(state => state.profile.user.name)
  const email = useAppSelector(state => state.profile.user.email)
  const isLoading = useAppSelector(state => state.profile.isLoading)
  const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn)
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
          <h3 style={{ marginTop: '0', fontWeight: '700', fontSize: '26px' }}>
            Personal information
          </h3>
          <div>
            <img src={avatar} alt="photo" style={{ height: '100px', borderRadius: '50%' }} />
          </div>
          <EditableSpan value={name} onChange={onChangeHandler} />
          <div>{email}</div>
          <div>
            <Button
              onClick={onClickLogOutHandler}
              type={'default'}
              htmlType={'button'}
              style={{ width: '100%' }}
            >
              Log out
            </Button>
          </div>
        </div>
      </StyledCard>
    </Space>
  )
}
