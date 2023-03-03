import React from 'react'

import { useNavigate } from 'react-router-dom'

import incubatorLogo from '../../../../assets/pictures/incubator-logo.png'
import { useProfile } from '../../../../features/profile/profile/hooks/useProfile'
import { HeaderImg, PrimaryButton } from '../../../style'
import { PATH } from '../../../utils'
import { UserBlock } from '../../user-block/UserBlock'
import { useHeader } from '../hooks/useHeader'

export const Header = () => {
  const { isLoggedIn, logOut } = useHeader()
  const navigate = useNavigate()
  const { data } = useProfile()

  return (
    <>
      <HeaderImg src={incubatorLogo} alt="logo" />
      {isLoggedIn ? (
        <UserBlock name={data?.name} avatar={data?.avatar} />
      ) : (
        <PrimaryButton width={'100'} onClick={() => navigate(PATH.LOGIN)}>
          Sign in
        </PrimaryButton>
      )}
    </>
  )
}
