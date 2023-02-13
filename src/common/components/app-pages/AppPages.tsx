import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import {
  CheckEmail,
  ForgotPassword,
  Login,
  Registration,
  SetNewPassword,
} from '../../../features/auth'
import { Profile } from '../../../features/profile'
import { EmptyPack } from '../../../features/tables/EmptyPack'
import { FullPack } from '../../../features/tables/FullPack'
import { PacksList } from '../../../features/tables/PacksList'
import { PATH } from '../../path/path'
import { Error404 } from '../error404/Error404'
import { PrivateRoutes } from '../private-routes/PrivateRoutes'

const AppPages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={PATH.PACKS_LIST} element={<PacksList />} />
      <Route path={PATH.FULL_PACK} element={<FullPack />} />
      <Route path={PATH.EMPTY_PACK} element={<EmptyPack />} />
      <Route path={'*'} element={<Error404 />} />
    </Routes>
  )
}

export default AppPages
