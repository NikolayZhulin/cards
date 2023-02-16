import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../../common/utils/path'
import { schemaPass } from '../../../../common/validation'
import { useSetNewPasswordMutation } from '../../authAPI'

export const useSetNewPassword = () => {
  const [setPass, { isSuccess, isLoading }] = useSetNewPasswordMutation()
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schemaPass) })

  useEffect(() => {
    if (isSuccess) {
      navigate(PATH.LOGIN)
    }
  }, [isSuccess])

  const onSubmit = handleSubmit(async ({ password }) => {
    await setPass({ password, resetPasswordToken: token })
  })

  return { onSubmit, errors, control, isLoading }
}
