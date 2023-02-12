import React from 'react'

import incubatorLogo from '../../../assets/pictures/incubator-logo.png'
import { useAppSelector } from '../../hooks/hooks'
import { HeaderComponent, HeaderImg, PrimaryButton } from '../../style'

export const AppHeader = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <HeaderComponent>
      <HeaderImg src={incubatorLogo} alt="logo" />
      {isLoggedIn && <PrimaryButton width={'100'}>Log out</PrimaryButton>}
    </HeaderComponent>
  )
}
