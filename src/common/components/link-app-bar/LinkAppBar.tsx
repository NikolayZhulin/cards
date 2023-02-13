import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../path/path'
import { LinkBar } from '../../style/link-bar'

export const LinkAppBar = () => {
  return (
    <LinkBar>
      <NavLink to={PATH.LOGIN} style={{ margin: '5px' }}>
        Login
      </NavLink>
      <NavLink to={PATH.REGISTRATION} style={{ margin: '5px' }}>
        Registration
      </NavLink>
      <NavLink to={PATH.PROFILE} style={{ margin: '5px' }}>
        Profile
      </NavLink>
      <NavLink to={PATH.NEW_PASSWORD} style={{ margin: '5px' }}>
        newPassword
      </NavLink>
      <NavLink to={PATH.FORGOT_PASSWORD} style={{ margin: '5px' }}>
        forgoPassword
      </NavLink>
      <NavLink to={PATH.CHECK_EMAIL} style={{ margin: '5px' }}>
        /check-email
      </NavLink>
      <NavLink to={'/pagination'} style={{ margin: '5px' }}>
        /pagination
      </NavLink>
    </LinkBar>
  )
}
