import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import { useGetUserProfileMutation, useLoginMutation } from './profile-api'

import { EditableSpan, getUserProfileAC } from './index'

export const Profile = () => {
  const [getProfile, { isLoading, data, error }] = useGetUserProfileMutation<any>()
  const [login, {}] = useLoginMutation<any>()
  const avatar = useAppSelector(state => state.profile.user.avatar)
  const name = useAppSelector(state => state.profile.user.name)
  const email = useAppSelector(state => state.profile.user.email)

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const onClickHandler = () => {
    console.log('Log out')
  }
  const onChangeHandler = () => {
    console.log('Name has been changed')
  }

  useEffect(() => {
    // login({
    //   email: 'nikitagaponov@yandex.ru',
    //   password: 'pass-12345',
    //   rememberMe: true,
    // })
    getProfile({}).then(() => {
      getUserProfileAC(data)
    })
  }, [])

  return !isLoggedIn ? (
    <Navigate to={'/login'} />
  ) : (
    <div
      style={{ width: '200px', height: '200px', border: '1px solid black', textAlign: 'center' }}
    >
      <div>Personal Information</div>
      <div>
        <img src={avatar} alt="photo" />
      </div>
      <EditableSpan value={name} onChange={onChangeHandler} />
      <div>{email}</div>
      <div>
        <button onClick={onClickHandler}>Log out</button>
      </div>
    </div>
  )
}
