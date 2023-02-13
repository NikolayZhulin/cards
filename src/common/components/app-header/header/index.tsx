import React from 'react'

import incubatorLogo from '../../../../assets/pictures/incubator-logo.png'
import { HeaderImg, PrimaryButton } from '../../../style'
import { useHeader } from '../hooks/useHeader'

const Header = () => {
  const { isLoggedIn, logOut } = useHeader()

  return (
    <>
      <HeaderImg src={incubatorLogo} alt="logo" />
      {isLoggedIn && (
        <PrimaryButton width={'100'} onClick={logOut}>
          Log out
        </PrimaryButton>
      )}
    </>
  )
}

export default Header
