import React from 'react'

import './App.css'

import { ErrorSnackBar, LinkAppBar } from '../common/components'
import { AppHeader } from '../common/components/app-header/AppHeader'
import AppPages from '../common/components/app-pages/AppPages'

export const App = () => {
  return (
    <>
      <AppHeader />
      <AppPages />
      <LinkAppBar />
      <ErrorSnackBar />
    </>
  )
}

//https://github.com/PasterZOOM/cards
