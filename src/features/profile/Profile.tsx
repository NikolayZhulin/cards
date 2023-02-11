import React, { useEffect } from 'react'

import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import avaIcon from '../../assets/pictures/avatar.jpg'
import { Preloader } from '../../common/components/preloader/Preloader'
import { CardWrapper, FormTitle, FormWrapper, StyledCard } from '../../common/style'
import { useLogOutMutation, useMeMutation } from '../auth/authAPI'

import { useChangeUserMutation } from './profile-api'

import { EditableSpan } from './index'

export const Profile = () => {
  const [getProfile, {}] = useMeMutation<any>()
  const [changeUser, { isSuccess }] = useChangeUserMutation<any>()
  const [logOut, {}] = useLogOutMutation<any>()
  const avatar = useAppSelector(state => state.profile.user.avatar)
  const name = useAppSelector(state => state.profile.user.name)
  const email = useAppSelector(state => state.profile.user.email)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isLoading = useAppSelector(state => state.profile.isLoading)
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

  if (!isLoggedIn) return <Navigate to={'/login'} />

  return (
    <CardWrapper>
      <StyledCard style={{ width: '400px' }}>
        <FormWrapper>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <FormTitle>Personal information</FormTitle>
              <div>
                <img
                  src={avatar || avaIcon}
                  alt="photo"
                  style={{ height: '100px', borderRadius: '50%' }}
                />
              </div>
              <EditableSpan value={name} onChange={onChangeHandler} isSuccess={isSuccess} />
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
            </>
          )}
        </FormWrapper>
      </StyledCard>
    </CardWrapper>
  )
}
