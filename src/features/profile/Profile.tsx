import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { useChangeUserMutation, useGetUserProfileMutation, useLoginMutation } from './profile-api'

import { changeUserAC, EditableSpan, setUserProfileAC } from './index'

export const Profile = () => {
  const [getProfile, { data: profile, isSuccess: profileHasLoad, isLoading }] =
    useGetUserProfileMutation<any>()
  const [login, {}] = useLoginMutation<any>()
  const [changeUser, { data, error, isSuccess }] = useChangeUserMutation<any>()
  const avatar = useAppSelector(state => state.profile.user.avatar)
  const name = useAppSelector(state => state.profile.user.name)
  const email = useAppSelector(state => state.profile.user.email)
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const onClickHandler = () => {
    console.log('Log out')
  }
  const onChangeHandler = (value: string) => {
    changeUser({ name: value })
  }

  useEffect(() => {
    // login({
    //   email: 'nikitagaponov@yandex.ru',
    //   password: 'pass-12345',
    //   rememberMe: true,
    // })
    getProfile({})
  }, [])
  useEffect(() => {
    isSuccess &&
      dispatch(changeUserAC({ name: data.updatedUser.name, avatar: data.updatedUser.avatar }))
  }, [isSuccess])
  useEffect(() => {
    profileHasLoad && dispatch(setUserProfileAC(profile))
  }, [profileHasLoad])

  if (isLoading) return <div>loading...</div>

  return !isLoggedIn ? (
    <Navigate to={'/login'} />
  ) : (
    <div
      style={{ width: '200px', height: '200px', border: '1px solid black', textAlign: 'center' }}
    >
      <div>Personal Information</div>
      <div>
        <img src={avatar} alt="photo" style={{ height: '100px' }} />
      </div>
      <EditableSpan value={name} onChange={onChangeHandler} />
      <div>{email}</div>
      <div>
        <button onClick={onClickHandler}>Log out</button>
      </div>
    </div>
  )
}
