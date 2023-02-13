import React from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'

import { LoginForm } from './login-form'

export const Login = () => {
  return (
    <CardWrapper>
      <StyledCard>
        <LoginForm />
      </StyledCard>
    </CardWrapper>
  )
}
