import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../path/path'
import { HeaderComponent } from '../../style/form-styles'

export const Header = () => {
  return (
    <HeaderComponent>
      <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
      <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
      <NavLink to={PATH.RECOVERY_PASSWORD}>RECOVERY PASSWORD</NavLink>
      <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
      <NavLink to={PATH.NEW_PASSWORD}>NEW PASSWORD</NavLink>
    </HeaderComponent>
  )
}
