import React from 'react'

import './App.css'

import { ErrorSnackBar, LinkAppBar } from '../common/components'
import { AppHeader } from '../common/components/app-header/AppHeader'
import AppPages from '../common/components/app-pages/AppPages'
import { InitialPreloader } from '../common/components/loaders/InitialLoader'
import { useAppSelector } from '../common/hooks/hooks'
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
      <LinkAppBar />
      <ErrorSnackBar />
    </>
  )
}
