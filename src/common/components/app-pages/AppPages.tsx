import React from 'react'

import { Route, Routes } from 'react-router-dom'

import {
  CheckEmail,
  ForgotPassword,
  Login,
  Registration,
  SetNewPassword,
} from '../../../features/auth'
import { Profile } from '../../../features/profile'
import { PATH } from '../../path/path'
import { Error404 } from '../error404/Error404'

const AppPages = () => {
  return (
    <Routes>
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={'/*'} element={<Error404 />} />
    </Routes>
  )
}

export default AppPages
