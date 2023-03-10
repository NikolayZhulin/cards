import React from 'react'

import './App.css'

import { ErrorSnackBar, InitialPreloader } from '../common/components'
import { AppHeader } from '../common/components/app-header'
import AppPages from '../common/components/app-pages/AppPages'
import { useAppSelector } from '../common/hooks/reduxHooks'
import { useMeQuery } from '../features/auth'

export const App = () => {
  const initialized = useAppSelector(state => state.app.isInitialized)
  const {} = useMeQuery()

  if (!initialized) {
    return <InitialPreloader />
  }

  return (
    <>
      <AppHeader />
      <AppPages />
      <ErrorSnackBar />
    </>
  )
}
