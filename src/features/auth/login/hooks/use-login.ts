import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../common/hooks/hooks'
import { PATH } from '../../../../common/path/path'
import { schemaLogin } from '../../../../common/validation'
import { useLoginMutation } from '../../authAPI'

export const useLogin = () => {
  const [login, { isLoading, data }] = useLoginMutation()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schemaLogin) })

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.PROFILE)
    }
  }, [isLoggedIn])

  const onSubmit = handleSubmit(async ({ email, password, rememberMe }) => {
    await login({ email, password, rememberMe })
    reset()
  })

  return { onSubmit, errors, control, isLoading }
}
