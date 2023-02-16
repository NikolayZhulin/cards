import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../common/utils/path'
import { schemaRegister } from '../../../../common/validation'
import { useRegistrationMutation } from '../../authAPI'

export const useRegistration = () => {
  const [registration, { isLoading, data }] = useRegistrationMutation()
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schemaRegister) })

  useEffect(() => {
    if (data?.addedUser) {
      navigate(PATH.LOGIN)
    }
  }, [data])

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await registration({ email, password })
  })

  return { onSubmit, errors, control, isLoading }
}
