import { useAppSelector } from '../../../../common/hooks/reduxHooks'
import { useChangeUserMutation, useLogOutMutation, useMeQuery } from '../../../auth'

export const useProfile = () => {
  const { data, isLoading } = useMeQuery()
  const [changeUser, { isSuccess, isLoading: userIsUpdating }] = useChangeUserMutation()
  const [logOut, {}] = useLogOutMutation()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const logOutHandler = () => {
    logOut({})
  }
  const onChangeUserHandler = (value?: string, avatar?: string) => {
    changeUser({ name: value, avatar: avatar })
  }

  return {
    data,
    isLoading,
    isLoggedIn,
    isSuccess,
    logOutHandler,
    onChangeUserHandler,
    userIsUpdating,
  }
}
