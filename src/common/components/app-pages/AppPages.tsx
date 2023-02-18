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
import { Cards } from '../../../features/tables/table/Cards'
import { PacksList } from '../../../features/tables/table/PackList'
import { PATH } from '../../utils'
import { Error404 } from '../error404/Error404'
import { ModalFC } from '../modal/ModalFC'
import { PrivateRoutes } from '../private-routes/PrivateRoutes'

const AppPages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS_LIST} element={<PacksList />} />
        <Route path={PATH.CARDS} element={<Cards />} />
      </Route>
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={'*'} element={<Error404 />} />
      <Route
        path={'/modal'}
        element={
          <ModalFC
            open={true}
            handleOk={() => {}}
            handleCancel={() => {}}
            loading={true}
            cancelText={'Cancel'}
            okText={'Save'}
            danger={true}
          >
            Hello my friends!
          </ModalFC>
        }
      />
    </Routes>
  )
}

export default AppPages
