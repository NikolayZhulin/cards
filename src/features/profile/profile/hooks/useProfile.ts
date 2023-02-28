import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../common/hooks/reduxHooks'
import { PATH } from '../../../../common/utils/path'
import { useChangeUserMutation, useLogOutMutation, useMeQuery } from '../../../auth'

export const useProfile = () => {
  const { data, isLoading } = useMeQuery()
  const [changeUser, { isSuccess }] = useChangeUserMutation()
  const [logOut, {}] = useLogOutMutation()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn])

  const logOutHandler = () => {
    logOut({})
  }
  // I deleted async
  const onChangeHandler = (value?: string, avatar?: string) => {
    changeUser({ name: value, avatar: avatar })
  }

  return { data, isLoading, isLoggedIn, isSuccess, logOutHandler, onChangeHandler }
}
