import { useLogOutMutation } from '../../../../features/auth'
import { useAppSelector } from '../../../hooks/reduxHooks'

export const useHeader = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const [logOut, {}] = useLogOutMutation()

  return { isLoggedIn, logOut }
}
