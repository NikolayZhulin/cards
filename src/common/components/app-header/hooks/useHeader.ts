import { useLogOutMutation } from '../../../../features/auth'
import { useAppSelector } from '../../../hooks/hooks'

export const useHeader = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const [logOut, {}] = useLogOutMutation()

  return { isLoggedIn, logOut }
}
