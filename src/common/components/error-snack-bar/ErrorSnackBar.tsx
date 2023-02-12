import React, { useEffect } from 'react'

import { message } from 'antd'

import { setAppErrorAC } from '../../../app'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

export const ErrorSnackBar = () => {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (error) {
      messageApi
        .open({
          type: 'error',
          content: error,
        })
        .then(res => {
          dispatch(setAppErrorAC({ error: null }))
        })
    }
  }, [error])

  return <>{contextHolder}</>
}
