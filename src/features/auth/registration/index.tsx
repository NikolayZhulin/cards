import React, { memo } from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'

import { RegistrationForm } from './registration-form'

export const Registration: React.FC = memo(() => {
  return (
    <CardWrapper>
      <StyledCard>
        <RegistrationForm />
      </StyledCard>
    </CardWrapper>
  )
})
