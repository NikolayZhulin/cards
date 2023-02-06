import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import { EditableSpan } from './index'

export const Profile = () => {
  const avatar = useAppSelector(state => state.profile.avatar)
  const name = useAppSelector(state => state.profile.name)
  const email = useAppSelector(state => state.profile.email)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const onClickHandler = () => {
    console.log('Log out')
  }
  const onChangeHandler = () => {
    console.log('Name has been changed')
  }

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
