import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../common/hooks/hooks'
import { PATH } from '../../../../common/path/path'
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

  const onChangeHandler = async (value: string) => {
    await changeUser({ name: value })
  }

  return { data, isLoading, isLoggedIn, isSuccess, logOutHandler, onChangeHandler }
}
