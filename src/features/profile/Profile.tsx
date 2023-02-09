import React, { useEffect } from 'react'

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
    <StyledCard>
      <FormContainer>Personal Information</FormContainer>
      <div>
        <img src={avatar} alt="photo" style={{ height: '100px' }} />
      </div>
      <EditableSpan value={name} onChange={onChangeHandler} />
      <div>{email}</div>
      <div>
        <button onClick={onClickLogOutHandler}>Log Out</button>
      </div>
    </StyledCard>
  )
}
