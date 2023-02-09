import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'

import { Error404 } from '../common/components/error404/error404'
import Layout from '../common/components/layout/layout'
import { CheckEmail } from '../features/auth/check-email'
import { ForgotPassword } from '../features/auth/forgot-password'
import { Login } from '../features/auth/login'
import { Registration } from '../features/auth/registration'
import { SetNewPassword } from '../features/auth/set-new-password/SetNewPassword'
import { Profile } from '../features/profile'

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/check-email'} element={<CheckEmail />} />
        <Route path={'/set-new-password/:token'} element={<SetNewPassword />} />
        <Route path={'/*'} element={<Error404 />} />
      </Route>
    </Routes>
  )
}

//https://github.com/PasterZOOM/cards
