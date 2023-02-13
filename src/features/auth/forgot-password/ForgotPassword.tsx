import React from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'

import { ForgotPasswordForm } from './forgot-password-form'

export const ForgotPassword: React.FC = () => {
  return (
    <>
      <CardWrapper>
        <StyledCard>
          <ForgotPasswordForm />
        </StyledCard>
      </CardWrapper>
    </>
  )
}
