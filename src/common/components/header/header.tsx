import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../path/path'
import { HeaderComponent } from '../../style'

export const Header = () => {
  return (
    <HeaderComponent>
      <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
      <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
      <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
      <NavLink to={PATH.NEW_PASSWORD}>NEW PASSWORD</NavLink>
      <NavLink to={PATH.FORGOT_PASSWORD}>FORGOT PASSWORD</NavLink>
      <NavLink to={PATH.SET_NEW_PASSWORD}>SET NEW PASSWORD</NavLink>
      <NavLink to={PATH.CHECK_EMAIL}>/check-email</NavLink>
    </HeaderComponent>
  )
}
