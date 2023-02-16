import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { PATH } from '../../../../common/utils/path'
import { schemaEmail } from '../../../../common/validation'
import { isSentRecoveryLetterAC } from '../../auth-reducer'
import { useForgotPasswordMutation } from '../../authAPI'

export const useForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const isLetterRecoverySent = useAppSelector<boolean>(state => state.auth.isRecoveryLetterSent)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(isSentRecoveryLetterAC({ isRecoveryLetterSent: false }))
  }, [isLetterRecoverySent])

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schemaEmail) })

  const onSubmit = handleSubmit(async ({ email }) => {
    await forgotPassword(email)
    navigate(PATH.CHECK_EMAIL)
  })

  return { onSubmit, errors, control, isLoading }
}
