import { useEffect } from 'react'

import { Alert } from 'antd'
import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { Preloader } from '../../common/components/preloader/Preloader'
import { useAppSelector } from '../../common/hooks/hooks'

export const Packs = () => {
  // const [getProfile, {}] = useMeMutation<any>()

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isLoading = useAppSelector(state => state.packs.isLoading)
  const error = useAppSelector(state => state.auth.error)
  const dispatch = useAppDispatch()

  useEffect(() => {}, [])

  if (!isLoggedIn) return <Navigate to={'/login'} />

  return (
    <>
      {isLoading ? <Preloader /> : <></>}
      {error && (
        <Alert
          style={{ position: 'absolute', bottom: '3%' }}
          message={error.data.error}
          type="error"
          closable
        />
      )}
    </>
  )
}
