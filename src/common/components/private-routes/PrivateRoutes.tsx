import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../hooks/hooks'
import { PATH } from '../../utils/path'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
