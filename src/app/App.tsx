import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'

import { Error404 } from '../common/components/error404/error404'
import Layout from '../common/components/layout/layout'
import { CheckEmail } from '../features/check-email'
import { ForgotPassword } from '../features/forgot-password'
import { Login } from '../features/login'
import { Profile } from '../features/profile'
import { Registration } from '../features/registration'
import { SetNewPassword } from '../features/set-new-password/SetNewPassword'

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/set-new-password'} element={<div>set new pass</div>} />
        <Route path={'/check-email'} element={<CheckEmail />} />
        <Route path={'/set-new-password/:token'} element={<SetNewPassword />} />
        <Route path={'/*'} element={<Error404 />} />
      </Route>
    </Routes>
  )
}

//https://github.com/PasterZOOM/cards
